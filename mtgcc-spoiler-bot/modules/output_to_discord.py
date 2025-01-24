async def build_discord_embed_object( set_name_data, card_data_object ):
    import discord
    from .time_functions import get_curr_datetime

    set_code = set_name_data['set_code']
    set_name = set_name_data['set_name'].title()
    embed_text = f'{get_curr_datetime( "YYYY-MM-DD HH:mm" )} New {set_name} Spoilers Found!'
    embed_url = f'https://mythicspoiler.com/{set_code}/index.html'
    embed_array = []

    for card_data in card_data_object:
        card_image = card_data.split(': ')[1]
        embed = discord.Embed(url=f'{embed_url}', title=embed_text)
        embed.set_image(url=f'https://mythicspoiler.com/{card_image}')
        embed_array.append( embed )

    return embed_array


async def stage_embed_object_for_send( client, embed_object ):
    import math

    embed_image_count = len(embed_object) - 1
    iterations_needed = ( math.floor( embed_image_count / 4 ) )
    current_iteration = 0

    if iterations_needed == 0 or embed_image_count == 4:
        await send_message_to_discord( client, embed_object )
        return

    while current_iteration <= iterations_needed:
        iteration_start = current_iteration * 4
        iteration_end = iteration_start + 4
        embed_to_send = embed_object[iteration_start:iteration_end]

        await send_message_to_discord( client, embed_to_send )
        current_iteration += 1

    return


async def build_astral_output(set_name_data, spoiled_card_count):
    import discord
    from .time_functions import get_curr_datetime

    set_code = set_name_data['set_code']
    set_name = set_name_data['set_name'].title()
    embed_title = f'{get_curr_datetime( "YYYY-MM-DD HH:mm" )} New {set_name} Spoilers Found!'
    embed_url = f'https://mythicspoiler.com/{set_code}/index.html'
    embed = discord.Embed(title=embed_title, url=embed_url, description=f'Click through to see the {spoiled_card_count} new {set_name} spoilers!')
    embed.set_thumbnail(url=f'http://mythicspoiler.com/images/buttons/menubutton{set_code}.png')

    return embed


async def send_notification_to_astral( client, set_name_data, spoiled_card_count=0 ):
    from .return_channels import return_astral_channel

    channel_id = await return_astral_channel()
    channel = client.get_channel( channel_id )
    embed = await build_astral_output(set_name_data, spoiled_card_count)

    await channel.send( embed=embed )


async def send_message_to_discord( client, embed_object ):
    from .return_channels import return_channel_list

    channel_list = await return_channel_list()

    for channel_id in channel_list:
        channel = client.get_channel( channel_id )
        await channel.send( embeds=embed_object )
