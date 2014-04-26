(ns www.models.ghub
  (:require [tentacles.repos :as ghub]
            [www.utils :refer [in?]]))

; start constants
(def user-name "landau")

(def filtered-repos
  ["hubot-tapin"
   "learningfromlibraries"
   "requiredemo"
   "dotfiles"
   "cn-sinon-prezzo"
   "mta"
   "2014.cascadiajs.com"
   "landau.github.io"])

(def picked-repo-prop
  ["id"
   "name"
   "full_name"
   "html_url"
   "description"
   "stargazers_count"
   "watchers_count"
   "created_at"
   "updated_at"
   "pushed_at"])
; end constants

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

; start repos
(defn repos
  "Retrieves landau's repos from ghub"
  []
  (-> user-name ghub/user-repos
      filter-forks
      filter-repos))
; end repos

(map :name (repos))
