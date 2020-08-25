# time-tracker

With this simple tool, you can calculate time!
For the strings with one time interval like `12:57-16:15` it will divide by dash and semicolon.
If you have a string with several time intervals like `12:57-16:15,08:23-13:52`, you need to use the input element below. First, it will divide by commas, then it will work the same way as for one time interval.

You can also add already calculated strings instead of a time interval like `3:23, 0:26, 17:10-20:39`. The result will be `7:18`.

The script can calculate time between several days, for example, `23:59-00:02` will result in `00:03`.
