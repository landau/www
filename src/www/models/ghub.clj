(ns www.models.ghub
  (:require [tentacles.repos :as ghub]
            [www.utils :refer [in?]]
            [clojure.core.cache :refer [->TTLCache ttl-cache-factory] :as cache]))

; start constants
(def ^:const my-user "landau")

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

; start filter repos
(defn filter-repos
  "filters out repos I don't want to display"
  [repos]
  (filter #(and
             (false? (:fork %)) ; not a fork
             ((complement in?) filtered-repos (:name %))) ; not one of these repos
          repos))
; end filter repos

; start get-repos
(defn get-repos
  "Retrieves landau's repos from ghub"
  [user]
  (-> user ghub/user-repos filter-repos))
; end get-repos

; start repos
(defn get-cached-repos
  "Retreives a user-names repos from ghub and caches it"
  [user]
  (if (cache/has? @repo-cache :repos)
    (:repos (cache/hit @repo-cache :repos))
    (let [repos (get-repos user)]
     (swap! repo-cache #(cache/miss % :repos repos))
      (:repos repos))))
; end repos
