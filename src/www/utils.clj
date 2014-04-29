(ns www.utils
  (:require
    [clj-time.format :as ftime]))

(defn in?
  "true if seq contains v"
  [seq v]
  (some #(= v %) seq))

(def iso-formatter (ftime/formatters :date-time-no-ms))

; start format-iso
(defn format-iso
  "formats an iso date to a given date-format string"
  [date-format iso]
  (let [formatter (ftime/formatter date-format)]
    (ftime/unparse formatter
                   (ftime/parse iso-formatter iso))))
; end format-iso

; start iso-to-date
(defn iso->date
  "formats an iso date to MM/dd/yyyy"
  [iso]
  (format-iso "MM/dd/yyyy" iso))
; end iso-to-date
