async def return_text_only_channels():
    import os

    channel_id = os.getenv('TEXT_ONLY_CHANNEL_LIST')

    return int(channel_id)


async def return_channel_list():
    import os

    channel_list_str = os.getenv('FULL_EMBED_CHANNEL_LIST')
    channel_list_arr = list(map(int, channel_list_str.split(',')))

    return channel_list_arr
