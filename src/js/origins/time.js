define(function() {

    var intervals = [
        [60 * 60 * 24 * 365, 'year', 'years'],
        [60 * 60 * 24 * 30, 'month', 'months'],
        [60 * 60 * 24 * 7, 'week', 'weeks'],
        [60 * 60 * 24, 'day', 'days'],
        [60 * 60, 'hour', 'hours'],
        [60, 'minute', 'minute'],
        [1, 'second', 'seconds']
    ];


    var timeSince = function(o) {
        if (o.unit === 'second' && o.value < 3) {
            return 'Just now';
        }

        var unit = o.value === 1 ? o.unit : o.pluralUnit;

        return o.value + ' ' + unit + ' ago';
    };

    // Given a date, returns the largest time interval.
    var getInterval = function(date) {

        // Get the delta (in seconds) between now and the date
        var now = new Date(),
            delta = Math.floor((now - date) / 1000);

        // Minimum of a second
        var seconds = Math.max(delta, 1);

        for (var v, r, i = 0; i < intervals.length; i++) {
            r = intervals[i];
            v = Math.floor(seconds / r[0]);

            if (v >= 1) {
                return {
                    date: date,
                    value: v,
                    interval: r[0],
                    unit: r[1],
                    pluralUnit: r[2]
                };
            }
        }

        throw new Error('time interval error');
    };


    return {
        timeSince: timeSince,
        getInterval: getInterval
    };

});
