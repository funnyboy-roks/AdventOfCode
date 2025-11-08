(use-modules (ice-9 textual-ports))

(define (parse-line s) (map string->number (string-split s #\space)))
(define (signum n) (if (< n 0) -1 (if (> n 0) 1 0)))

(define (remove-n lst i)
  (if (null? lst)
      null
      (if (= i 0)
          (cdr lst)
          (cons (car lst) (remove-n (cdr lst) (- i 1))))))

(define (range first last)
  (if (>= first last)
      '()
      (cons first (range (+ first 1) last))))

(define (valid nums prev-sign) (and (list-ref nums 0) (or
  (<= (length nums) 1)
  (let
    (
      (diff (- (list-ref nums 1) (list-ref nums 0)))
    )
    (and
      (or
        (= prev-sign 0)
        (= (signum diff) prev-sign))
      (>= (abs diff) 1)
      (<= (abs diff) 3)
      (valid (list-tail nums 1) (signum diff)))))))

(define (foldl f init lst)
  (if (= (length lst) 0)
    init
    (foldl f (f init (list-ref lst 0)) (list-tail lst 1))))

(define (valid2 nums)
  (foldl
    (lambda (x y) (or x y))
    #f
    (map
      (lambda (i) (valid (remove-n nums i) 0))
      (range 0 (length nums)))))

(begin
  (define args (command-line))
  (define path (list-ref args (- (length args) 1)))
  (define lines
    (filter
      (lambda (x) (not (= (string-length x) 0)))
      (string-split
        (string-trim
          (call-with-input-file path get-string-all))
        #\newline)))
  (display (length (filter
                     (lambda (x) (valid2 x))
                     (map parse-line lines))))
  (newline))
