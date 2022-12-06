import pillow


def handler(event, context):
    print("Event ==>> ", event)
    print("Context ==>> ", context)
    print("Hello Python Lambda")
    return event
