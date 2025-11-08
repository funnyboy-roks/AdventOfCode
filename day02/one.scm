(use-modules (ice-9 textual-ports))

(define (parse-line s) (map string->number (string-split s #\space)))
(define (signum n) (if (< n 0) -1 (if (> n 0) 1 0)))

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

(begin
  (define args (command-line))
  (define path (list-ref args (- (length args) 1)))
  (define lines (string-split (call-with-input-file path get-string-all) #\newline))
  (display (length (filter
                     (lambda (x) (valid x 0))
                     (map parse-line lines))))
  (newline))
