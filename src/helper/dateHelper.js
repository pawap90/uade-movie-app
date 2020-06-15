'use strict';

export default class DateHelper {

	/**
     * Format date object to local string date
     * @param {Date} date Date object to be formatted.
     */
	static format(date) {
		if (!date)
			return;
            
		let day = date.getDate();

		if(day < 10)
			day = `0${day}`;
        
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}
}