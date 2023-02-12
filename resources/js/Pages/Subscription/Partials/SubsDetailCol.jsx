import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from 'reactstrap';
import moment from 'moment/moment';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};

const currencyFormat = (num) => {
    return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };


const Pdate = (cell) => {
    return cell.value ? formateDate(cell.value, "M, Y") : '';
};

const Ddate = (cell) => {
    return cell.value ? formateDate(cell.value, "M, Y") : '';
};

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const Idno = (cell) => {
    return cell.value ? cell.value : '';
};

const Budget = (cell) => {
    return cell.value ? currencyFormat(cell.value) : '';
};


export {
    Pdate,
    Ddate,
    Name,
    Idno,
    Budget
};
