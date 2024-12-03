def get_curr_datetime():
    import pendulum

    now = pendulum.now(tz='US/Eastern').format('YYYY-MM-DD HH:mm:ss')

    print( now )

