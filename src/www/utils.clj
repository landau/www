(ns www.utils)

(defn in?
  "true if seq contains v"
  [seq v]
  (some #(= v %) seq))
