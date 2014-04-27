(ns www.models.ghub
  (:require [tentacles.repos :as ghub]
            [www.utils :refer [in? iso-to-date]]
            [clj-time.format :as format-time]
            [clojure.core.cache :refer [->TTLCache ttl-cache-factory] :as cache]))

; start constants
(def ^:const user-name "landau")

(def ^:const filtered-repos
  ["hubot-tapin"
   "learningfromlibraries"
   "requiredemo"
   "dotfiles"
   "cn-sinon-prezzo"
   "mta"
   "2014.cascadiajs.com"
   "landau.github.io"])

; start repo-cache
(def ^:const ttl (* 1000 60 15)) ; cache 15 min
(def repo-cache (atom (ttl-cache-factory {} :ttl ttl)))
; start repo-cache

; start filter-forks
(defn filter-forks
  "Filters out forked repos"
  [repos]
  (filter #(false? (% :fork))
          repos))
; end filter-forks

; start filter repos
(defn filter-repos
  "filters out repos I don't want to display"
  [repos]
  (filter #((complement in?) filtered-repos (:name %))
          repos))
; end filter repos

; start sort-by
;

; start get-repos
(defn get-repos
  "Retrieves landau's repos from ghub"
  []
  (-> user-name ghub/user-repos
      filter-forks
      filter-repos))
; end get-repos

; start repos
(defn repos []
  "Retreives landau's repos from ghub and caches it"
  (swap! repo-cache #(cache/miss % :repos (get-repos))))
; end repos
