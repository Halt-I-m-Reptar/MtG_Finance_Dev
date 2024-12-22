def get_curr_datetime():
    import pendulum

    formatted_time = pendulum.now(tz='US/Eastern').format('YYYY-MM-DD HH:mm:ss')

    return formatted_time
