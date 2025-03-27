async def send_text_only_output( client, set_name_data, spoiled_card_count=0 ):
    from ..generic.return_channels import return_text_only_channels
    from .create_embed_objects import build_text_only_output

    channel_id = await return_text_only_channels()
    channel = client.get_channel( channel_id )
    embed = await build_text_only_output(set_name_data, spoiled_card_count)

    await channel.send( embed=embed )


async def send_embedded_images_output( client, embed_object ):
    from ..generic.return_channels import return_channel_list

    channel_list = await return_channel_list()

    for channel_id in channel_list:
        channel = client.get_channel( channel_id )
        await channel.send( embeds=embed_object )


async def stage_embed_object_for_send( client, embed_object ):
    import math

    embed_image_count = len(embed_object)
    iterations_needed = ( math.floor( embed_image_count / 4 ) )
    current_iteration = 0

    if iterations_needed == 0 or embed_image_count == 4:
        await send_embedded_images_output( client, embed_object )
        return

    while current_iteration < iterations_needed:
        iteration_start = current_iteration * 4
        iteration_end = iteration_start + 4

        if iteration_start == embed_image_count:
            break
        else:
            embed_to_send = embed_object[iteration_start:iteration_end]

        await send_embedded_images_output( client, embed_to_send )
        current_iteration += 1

    return
