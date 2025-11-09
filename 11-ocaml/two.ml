let read_whole_file filename =
    let ch = open_in_bin filename in
    let s = really_input_string ch (in_channel_length ch) in
    close_in ch;
    s

let split (n: int): (int * int) option =
    let nstr = string_of_int n in
    let strlen = String.length nstr in
    if strlen mod 2 == 0 then Some (
        int_of_string (String.sub nstr 0 (strlen / 2)),
        int_of_string (String.sub nstr (strlen / 2) (strlen / 2))
    )
    else None

let apply (depth: int) (stone: int): int =
    let memo = Hashtbl.create 11 in
    let rec apply_memo (depth: int) (stone: int): int =
        try Hashtbl.find memo (depth, stone)
        with Not_found -> 
            let v = match (depth, stone) with
            | (0, _) -> 1
            | (d, 0) -> apply_memo (d - 1) 1
            | (d, x) -> begin match split x with
                | Some (a, b)  -> (apply_memo (d-1) a) + (apply_memo (d-1) b)
                | None -> apply_memo (depth - 1) (stone * 2024)
            end
            in
        Hashtbl.add memo (depth, stone) v;
        v
    in
    apply_memo depth stone


let rec applyn depth lst =
    List.fold_left (+) 0 (List.map (apply depth) lst)

let foo (path: string) = read_whole_file path
    |> String.trim
    |> String.split_on_char ' '
    |> List.map int_of_string

let () =
    let path = Sys.argv.(Array.length Sys.argv - 1) in
    let nums = foo path in
    print_endline (String.concat " " (List.map string_of_int nums));
    applyn 75 nums |> print_int
    ()
