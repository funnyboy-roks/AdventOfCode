#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum State {
    Populated { size: usize, index: usize },
    Empty { size: usize },
}

fn defrag1(mut prev: &[State]) -> Vec<State> {
    while matches!(prev.last(), Some(State::Empty { .. })) {
        prev = &prev[..prev.len() - 1];
    }
    let last @ State::Populated { mut size, index } = prev[prev.len() - 1] else {
        panic!()
    };

    let mut out = Vec::new();
    let mut i = 0;
    for &x in &prev[..prev.len() - 1] {
        i += 1;
        if size == 0 {
            continue;
        }
        match x {
            State::Populated { size, index } => {
                out.push(x);
            }
            State::Empty { size: e_size } => {
                if e_size < size {
                    out.push(State::Populated {
                        size: e_size,
                        index,
                    });
                    size -= e_size;
                } else if e_size == size {
                    out.push(State::Populated { size, index });
                    size = 0;
                    break;
                } else if e_size > size {
                    out.push(State::Populated { size, index });
                    out.push(State::Empty {
                        size: e_size - size,
                    });
                    size = 0;
                    break;
                }
            }
        }
    }
    if i < prev.len() - 1 {
        out.extend(&prev[i..prev.len() - 1]);
    }

    if size > 0 {
        out.push(State::Populated { size, index });
    }
    out
}

fn defrag2(prev: &[State]) -> Vec<State> {
    let mut out = prev.to_vec();
    let mut i = 0;
    let mut prev_index = None;
    while i < out.len() {
        let State::Populated { size, index } = out[out.len() - i - 1] else {
            i += 1;
            continue;
        };

        if let Some(prev) = prev_index {
            if index > prev {
                i += 1;
                continue;
            }
        }

        prev_index = Some(index);

        for j in 0..(out.len() - i) {
            let State::Empty { size: e_size } = out[j] else {
                continue;
            };

            if size < e_size {
                out[j] = State::Populated { size, index };
                out.insert(
                    j + 1,
                    State::Empty {
                        size: e_size - size,
                    },
                );
                let out_len = out.len();
                out[out_len - i - 1] = State::Empty { size };
                break;
            } else if size == e_size {
                out[j] = State::Populated { size, index };
                let out_len = out.len();
                out[out_len - i - 1] = State::Empty { size };
                break;
            }
        }

        i += 1;
    }
    out
}

fn csum(state: &[State]) -> usize {
    let mut offset = 0;
    let mut sum = 0;
    for &s in state {
        match s {
            State::Populated { size, index } => {
                for _ in 0..size {
                    sum += offset * index;
                    offset += 1;
                }
            }
            State::Empty { size } => {
                offset += size;
            }
        }
    }
    return sum;
}

fn part1(x: Vec<State>) -> usize {
    let mut prev = x.clone();
    loop {
        let next = defrag1(&prev);
        if next == prev {
            break;
        }
        prev = next;
    }
    csum(&prev)
}

fn part2(x: Vec<State>) -> usize {
    let next = defrag2(&x);
    csum(&next)
}

fn main() {
    let path = std::env::args().last().unwrap();
    let s = std::fs::read_to_string(path)
        .unwrap()
        .trim()
        .chars()
        .map(|c| (c as u8 - b'0') as usize)
        .collect::<Vec<_>>();

    let x = s
        .iter()
        .copied()
        .enumerate()
        .filter_map(|(i, c)| {
            if c == 0 {
                None
            } else if i % 2 == 0 {
                Some(State::Populated {
                    size: c,
                    index: i / 2,
                })
            } else {
                Some(State::Empty { size: c })
            }
        })
        .collect::<Vec<_>>();
    println!("Part 1: {}", part1(x.clone()));
    println!("Part 2: {}", part2(x.clone()));
}
