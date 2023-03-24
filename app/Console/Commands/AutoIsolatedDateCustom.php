<?php

namespace App\Console\Commands;

use App\Models\Mikrotik;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\CrudNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Exceptions\ConnectException;
use RouterOS\Query;
use Illuminate\Support\Str;

class AutoIsolatedDateCustom extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:isolatedCustom';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto Isolated Subscriber with DueDate Custom integrated EveryDay';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $nowDate = date('d');
        $subs = Subscription::where('status', 'active')
            ->where('first_transaction', 0)
            ->where('auto_disable', 1)
            ->where('custom_duedate', '!=', '0')
            ->whereHas('transaction', function (Builder $query) {
                $query->whereMonth('created_at', Carbon::now()->month)
                    ->where('status', 'unpaid');
            })->get();
        if ($subs) {
            foreach ($subs as $sub) {
                $dueDate = $sub->custom_duedate;
                if ($dueDate == $nowDate) {
                    if ($sub->type == 'ppp') {
                        // Prepare Variable
                        $listIsolir = Setting::where('setting', 'pppList_isolated')->value('value');
                        $username = $sub->planable->prefixQueue . $sub->username . $sub->planable->sufixQueue;
                        $mikrotik = Mikrotik::where('name', $sub->planable->routers)->first();
                        // Sync to Mikrotik
                        if ($mikrotik) {
                            $config =
                                (new Config())
                                ->set('host', $mikrotik->{'ip_addr'})
                                ->set('port', $mikrotik->{'port'})
                                ->set('pass', $mikrotik->{'pass'})
                                ->set('user', $mikrotik->{'user'});
                            try {
                                $client = new Client($config);
                            } catch (ConnectException $e) {
                                die('Unable to connect to the router.');
                                return 0;
                            }
                            $query = new Query('/ppp/secret/set');
                            $query->equal('.id', $username);
                            $query->equal('profile', $listIsolir);
                            // Send query and read response from RouterOS
                            $response = $client->query($query)->read();
                            $njlimet = $client->query('/ppp/active/print', ['name', $username])->read();
                            if ($njlimet) {
                                $oldId = $njlimet[0]['.id'];
                                $query = new Query('/ppp/active/remove');
                                $query->equal('.id', $oldId);
                                $response = $client->query($query)->read();
                            }
                            $sub->update([
                                'status' => 'isolated',
                            ]);
                        } else {
                            return 0;
                        }
                        $nc_prime = User::first();
                        $nc_data = [
                            'subject' => 'Invis_Bot',
                            'action' => 'Auto_Isolated',
                            'status' => 'Success',
                            'table' => 'Custom DueDate',
                            'object' => $sub->customer->name,
                        ];
                        $nc_prime->notify(new CrudNotification($nc_data));
                    } elseif ($sub->type == 'static') {
                        // Prepare Variable
                        $username = $sub->planable->prefixQueue . $sub->queuename . $sub->planable->sufixQueue;
                        $commentaddrlist = $sub->queuename . "@" . $sub->area->name . "_";
                        $listIsolir = Setting::where('setting', 'staticList_isolated')->value('value');
                        $mikrotik = Mikrotik::where('name', $sub->planable->routers)->first();
                        // Sync to Mikrotik
                        if ($mikrotik) {
                            $config =
                                (new Config())
                                ->set('host', $mikrotik->{'ip_addr'})
                                ->set('port', $mikrotik->{'port'})
                                ->set('pass', $mikrotik->{'pass'})
                                ->set('user', $mikrotik->{'user'});
                            try {
                                $client = new Client($config);
                            } catch (ConnectException $e) {
                                die('Unable to connect to the router.');
                                return 0;
                            }
                            $njlimet = $client->query('/ip/firewall/address-list/print', [
                                ['address', $sub->ip_addr],
                                ['comment', $commentaddrlist],
                            ], '|')->read();
                            $oldId = $njlimet[0]['.id'];
                            $query = new Query('/ip/firewall/address-list/set');
                            $query->equal('.id', $oldId);
                            $query->equal('list', $listIsolir);
                            // Send query and read response from RouterOS
                            $response = $client->query($query)->read();
                            $sub->update([
                                'status' => 'isolated',
                            ]);
                        } else {
                            return 0;
                        }
                        $nc_prime = User::first();
                        $nc_data = [
                            'subject' => 'Invis_Bot',
                            'action' => 'Auto_Isolated',
                            'status' => 'Success',
                            'table' => 'Custom DueDate',
                            'object' => $sub->customer->name,
                        ];
                        $nc_prime->notify(new CrudNotification($nc_data));
                    }
                } else {
                    return 0;
                }
            }
        } else
            return 0;
    }
}
