async def send_text_only_output( client, set_release_datas_to_write ):
    from ..generic.return_channels import return_text_only_channels

    channel_list = await return_text_only_channels()
    embed = await build_text_only_output( set_release_datas_to_write )

    for channel_id in channel_list:
        channel = client.get_channel( channel_id )
        await channel.send( embed=embed )


async def build_text_only_output( set_release_datas_to_write ):
    import discord
    from ..generic.time_functions import get_curr_datetime

    post_description = ''

    for set_release_data in set_release_datas_to_write:
        set_release = set_release_data.split(': ')
        post_description += f'{set_release[0]} to release on {set_release[1]}\n'

    embed_title = f'{get_curr_datetime( "YYYY-MM-DD HH:mm" )} New Set Dates Released!'
    embed_url = f'https://aetherhub.com/Card/Set'
    embed = discord.Embed(title=embed_title, url=embed_url, description=f'{post_description}')
    embed.set_thumbnail(url=f'https://aetherhub.b-cdn.net/images/icons/favicon-228.png')

    return embed
