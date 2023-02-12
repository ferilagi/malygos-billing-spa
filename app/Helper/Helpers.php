<?php

use App\Models\Company;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;

/**
	 * Invis Logo
	 * @param $bytes int
	 * @param $null
	 * @return mixed
	 */

if (! function_exists('invis_logo')) {
    function invis_logo()
    {
        $logo = Company::first()->value('logo');
        if (!$logo) {
            return "/assets/images/logo.png";
        } else {
            return $logo;
        }
    }
}
if (! function_exists('invCur')) {
    function invCur()
    {
        $cur = Setting::where('setting', 'sys_curr')->value('value');
            return $cur;
    }
}
if (! function_exists('invTax')) {
    function invTax($number)
    {
        $tax = Setting::where('setting', 'inv_tax')->value('value')/100;
        $result = $number * $tax;
        return $result;
    }
}

if (! function_exists('authNotif')) {
    function authNotif()
    {
        $notif = Auth::user()->unreadNotifications()->paginate(5);
            return $notif;
    }
}

/**
	 * Bytes to Human Readable
	 * @param $bytes int
	 * @param $formatted bool
	 * @return mixed
	 */

if (!function_exists('bytesForHumans')) {
	function bytesForHumans($bytes, $formatted = true){
		$units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
		for ($i = 0; $bytes > 1024; $i++) {
			$bytes /= 1024;
		}
		return round($bytes, 2) . ' ' . ($formatted ? $units[$i] : null);
	}
}

if (!function_exists('formatDTM')) {
    function formatDTM($dtm) {
        $day= '';
        if(substr($dtm, 1,1) == "d" || substr($dtm, 2,1) == "d"){
            $day = explode("d",$dtm)[0]."d";
            $day = str_replace("d", "D", str_replace("w", "W", $day));
            $dtm = explode("d",$dtm)[1];
        }elseif(substr($dtm, 1,1) == "w" && substr($dtm, 3,1) == "d" || substr($dtm, 2,1) == "w" && substr($dtm, 4,1) == "d"){
            $day = explode("d",$dtm)[0]."d";
            $day = str_replace("d", "D", str_replace("w", "W", $day));
            $dtm = explode("d",$dtm)[1];
        }elseif (substr($dtm, 1,1) == "w" || substr($dtm, 2,1) == "w" ) {
            $day = explode("w",$dtm)[0]."w";
            $day = str_replace("d", "D", str_replace("w", "W", $day));
            $dtm = explode("w",$dtm)[1];
        }

        // secs
        if(strlen($dtm) == "2" && substr($dtm, -1) == "s"){
            $format = $day." 00:00:0".substr($dtm, 0,-1);
        }elseif(strlen($dtm) == "3" && substr($dtm, -1) == "s"){
            $format = $day." 00:00:".substr($dtm, 0,-1);
        //minutes
        }elseif(strlen($dtm) == "2" && substr($dtm, -1) == "m"){
            $format = $day." 00:0".substr($dtm, 0,-1).":00";
        }elseif(strlen($dtm) == "3" && substr($dtm, -1) == "m"){
            $format = $day." 00:".substr($dtm, 0,-1).":00";
        //hours
        }elseif(strlen($dtm) == "2" && substr($dtm, -1) == "h"){
            $format = $day." 0".substr($dtm, 0,-1).":00:00";
        }elseif(strlen($dtm) == "3" && substr($dtm, -1) == "h"){
            $format = $day." ".substr($dtm, 0,-1).":00:00";

        //minutes -secs
        }elseif(strlen($dtm) == "4" && substr($dtm, -1) == "s" && substr($dtm,1,-2) == "m"){
            $format = $day." "."00:0".substr($dtm, 0,1).":0".substr($dtm, 2,-1);
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "s" && substr($dtm,1,-3) == "m"){
            $format = $day." "."00:0".substr($dtm, 0,1).":".substr($dtm, 2,-1);
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "s" && substr($dtm,2,-2) == "m"){
            $format = $day." "."00:".substr($dtm, 0,2).":0".substr($dtm, 3,-1);
        }elseif(strlen($dtm) == "6" && substr($dtm, -1) == "s" && substr($dtm,2,-3) == "m"){
            $format = $day." "."00:".substr($dtm, 0,2).":".substr($dtm, 3,-1);

        //hours -secs
        }elseif(strlen($dtm) == "4" && substr($dtm, -1) == "s" && substr($dtm,1,-2) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":00:0".substr($dtm, 2,-1);
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "s" && substr($dtm,1,-3) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":00:".substr($dtm, 2,-1);
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "s" && substr($dtm,2,-2) == "h"){
            $format = $day." ".substr($dtm, 0,2).":00:0".substr($dtm, 3,-1);
        }elseif(strlen($dtm) == "6" && substr($dtm, -1) == "s" && substr($dtm,2,-3) == "h"){
            $format = $day." ".substr($dtm, 0,2).":00:".substr($dtm, 3,-1);

        //hours -secs
        }elseif(strlen($dtm) == "4" && substr($dtm, -1) == "m" && substr($dtm,1,-2) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":0".substr($dtm, 2,-1).":00";
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "m" && substr($dtm,1,-3) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":".substr($dtm, 2,-1).":00";
        }elseif(strlen($dtm) == "5" && substr($dtm, -1) == "m" && substr($dtm,2,-2) == "h"){
            $format = $day." ".substr($dtm, 0,2).":0".substr($dtm, 3,-1).":00";
        }elseif(strlen($dtm) == "6" && substr($dtm, -1) == "m" && substr($dtm,2,-3) == "h"){
            $format = $day." ".substr($dtm, 0,2).":".substr($dtm, 3,-1).":00";

        //hours minutes secs
        }elseif(strlen($dtm) == "6" && substr($dtm, -1) == "s" && substr($dtm,3,-2) == "m" && substr($dtm,1,-4) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":0".substr($dtm, 2,-3).":0".substr($dtm, 4,-1);
        }elseif(strlen($dtm) == "7" && substr($dtm, -1) == "s" && substr($dtm,3,-3) == "m" && substr($dtm,1,-5) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":0".substr($dtm, 2,-4).":".substr($dtm, 4,-1);
        }elseif(strlen($dtm) == "7" && substr($dtm, -1) == "s" && substr($dtm,4,-2) == "m" && substr($dtm,1,-5) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":".substr($dtm, 2,-3).":0".substr($dtm, 5,-1);
        }elseif(strlen($dtm) == "8" && substr($dtm, -1) == "s" && substr($dtm,4,-3) == "m" && substr($dtm,1,-6) == "h"){
            $format = $day." 0".substr($dtm, 0,1).":".substr($dtm, 2,-4).":".substr($dtm, 5,-1);
        }elseif(strlen($dtm) == "7" && substr($dtm, -1) == "s" && substr($dtm,4,-2) == "m" && substr($dtm,2,-4) == "h"){
            $format = $day." ".substr($dtm, 0,2).":0".substr($dtm, 3,-3).":0".substr($dtm, 5,-1);
        }elseif(strlen($dtm) == "8" && substr($dtm, -1) == "s" && substr($dtm,4,-3) == "m" && substr($dtm,2,-5) == "h"){
            $format = $day." ".substr($dtm, 0,2).":0".substr($dtm, 3,-4).":".substr($dtm, 5,-1);
        }elseif(strlen($dtm) == "8" && substr($dtm, -1) == "s" && substr($dtm,5,-2) == "m" && substr($dtm,2,-5) == "h"){
            $format = $day." ".substr($dtm, 0,2).":".substr($dtm, 3,-3).":0".substr($dtm, 6,-1);
        }elseif(strlen($dtm) == "9" && substr($dtm, -1) == "s" && substr($dtm,5,-3) == "m" && substr($dtm,2,-6) == "h"){
            $format = $day." ".substr($dtm, 0,2).":".substr($dtm, 3,-4).":".substr($dtm, 6,-1);

        }else{
            $format = $dtm;
        }
        return $format;
    }
}
