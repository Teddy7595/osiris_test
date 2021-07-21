import { Injectable } from '@nestjs/common';

import * as  Moment from "moment-timezone";
// const dateMoment = Moment().tz("America/Montevideo");
// dateMoment.locale('es');



@Injectable()
export class DateProcessService {

    setDate(){

        let dateMoment = Moment().tz("America/Montevideo");
        dateMoment.locale('es');

        return dateMoment.format('dddd,LL,h:mm A').split(',');

    }

    getShortDate()
    {
        let dateMoment = Moment().tz("America/Montevideo");
        dateMoment.locale('es');
    	return dateMoment.format('LL');
    }

    getDiffInDays(date:any)
    {
        let days:number = 0;
        let dateMoment = Moment().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.diff(Moment(date), 'days');
    }

    //incluimos un nuevo metodo para sacar rango de fechas
    getNextPointToPointInTime(days:number, date:any)
    {
    	let day_Array:String[] = Array();

    	for (let i = 1; i<= days; ++i)
    	{
    		day_Array.push(Moment(date).add(i, "days").format('LL'));
    	}

    	return day_Array;
    }

    getBackpointInTime(days:number)
    {
        let dateMoment = Moment().tz("America/Montevideo");
        dateMoment.locale('es');
    	return dateMoment.subtract(days, "days");
    }

    //funcion que me retorna fecha futura en base a dias
    getNextPointInTime(days:number)
    {
        let dateMoment = Moment().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('LL');
    }


}
