def get_curr_datetime( time_format='YYYY-MM-DD HH:mm:ss' ):
    import pendulum

    formatted_time = pendulum.now(tz='US/Eastern').format( time_format )

    return formatted_time
