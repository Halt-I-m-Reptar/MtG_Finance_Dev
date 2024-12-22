async def get_channel_list():
    import os

    channel_list_str = os.getenv('CHANNEL_LIST')
    channel_list_arr = list(map(int, channel_list_str.split(',')))

    return channel_list_arr


async def send_message_to_discord( client, card_data_object ):

    channel_list = await get_channel_list()

    for channel_id in channel_list:
        channel = client.get_channel( channel_id )

        for card_data in card_data_object:
            card_image = card_data.split(': ')[1]
            full_card_image_url = f'https://mythicspoiler.com/{card_image}'
            await channel.send( full_card_image_url )
