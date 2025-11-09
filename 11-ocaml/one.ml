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

let rec apply (lst: int list) = match lst with
    | [] -> []
    | 0 :: rest -> [1] @ apply rest
    | x :: rest -> begin match split x with
        | Some (a, b) -> [a; b] @ apply rest
        | None -> [x * 2024] @ apply rest
    end

let rec applyn (n: int) (lst: int list) = match n with
    | 0 -> lst
    | n -> applyn (n - 1) (apply lst)

let foo (path: string) = read_whole_file path
    |> String.trim
    |> String.split_on_char ' '
    |> List.map int_of_string

let () =
    let path = Sys.argv.(Array.length Sys.argv - 1) in
    let nums = foo path in
    print_endline (String.concat " " (List.map string_of_int nums));
    applyn 25 nums
        |> List.length
        |> string_of_int
        |> print_endline;
    ()
