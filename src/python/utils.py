
def any_is_none(* args):
    for a in args:
        if a is None:
            return True

    return False
