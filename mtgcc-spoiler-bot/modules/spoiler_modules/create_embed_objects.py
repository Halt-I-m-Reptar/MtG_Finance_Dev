async def build_discord_embed_object( set_name_data, card_data_object ):
    import discord
    import string
    from ..generic.time_functions import get_curr_datetime

    set_code = set_name_data['set_code']
    set_name = string.capwords(set_name_data['set_name'])

    embed_text = f'{get_curr_datetime( "YYYY-MM-DD HH:mm" )} New {set_name} Spoilers Found!'
    embed_url = f'https://mythicspoiler.com/{set_code}/index.html'
    embed_array = []

    for card_data in card_data_object:
        card_image = card_data.split(': ')[1]
        embed = discord.Embed(url=f'{embed_url}', title=embed_text)
        embed.set_image(url=f'https://mythicspoiler.com/{card_image}')
        embed_array.append( embed )

    return embed_array


async def build_text_only_output(set_name_data, spoiled_card_count):
    import discord
    import string
    from ..generic.time_functions import get_curr_datetime

    set_code = set_name_data['set_code']
    set_name = string.capwords(set_name_data['set_name'])

    embed_title = f'{get_curr_datetime( "YYYY-MM-DD HH:mm" )} New {set_name} Spoilers Found!'
    embed_url = f'https://mythicspoiler.com/{set_code}/index.html'
    embed = discord.Embed(title=embed_title, url=embed_url, description=f'Click through to see the {spoiled_card_count} new {set_name} spoilers!')
    embed.set_thumbnail(url=f'https://mythicspoiler.com/images/buttons/menubutton{set_code}.png')

    return embed
