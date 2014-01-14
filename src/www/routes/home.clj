(ns www.routes.home
  (:require [compojure.core :refer [defroutes GET]]
            [www.views.layout :refer [common]]
            [www.models.ghub :refer [get-cached-repos]]
            [www.utils :refer [iso->date]]))

; start get-repos
(defn get-repos []
  (->> (get-cached-repos "landau")
       (sort-by :watchers_count >)
       (sort-by :stargazers_count >)
       (map #(assoc % :updated_at (iso->date (:updated_at %))))))
; end get-repos

; start home
(defn home []
  (common (get-repos)))
; end home

(defroutes home-routes
  (GET "/" [] (home)))
