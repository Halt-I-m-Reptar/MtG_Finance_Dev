from discord import Intents, Client, Member
from dotenv import load_dotenv
import os
import asyncio
from datetime import datetime, timedelta
from bot_main import bot_main
from modules.spoiler_modules.set_file_creation_funcions import write_card_data_to_file

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
"""
    Bot setup
"""
intents: Intents = Intents.default()
client: Client = Client(intents=intents)
member: Member = Member


async def schedule_spoiler_search():
    from modules.spoiler_modules.output_to_discord import send_text_only_output, stage_embed_object_for_send
    from modules.spoiler_modules.create_embed_objects import build_discord_embed_object

    current_time = datetime.now()
    next_run = current_time + timedelta(seconds=10)
    wait_time = ( next_run - current_time ).total_seconds()

    await asyncio.sleep( wait_time )

    set_name_data, card_data_object = bot_main()

    if card_data_object:
        await write_card_data_to_file( set_name_data, card_data_object )
        embed_object = await build_discord_embed_object( set_name_data, card_data_object )
        await stage_embed_object_for_send( client, embed_object )
        await send_text_only_output( client, set_name_data, len(embed_object) )


@client.event
async def on_ready():
    await schedule_spoiler_search()
    await client.close()


def main():
    client.run(token=TOKEN)


main()
