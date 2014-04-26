(ns www.routes.home
  (:require [compojure.core :refer [defroutes GET]]
            [www.views.layout :refer [common]]
            [www.models.ghub :refer [repos]]))

; start home
(defn home []
  (common (repos)))
; end home

(defroutes home-routes
  (GET "/" [] (home)))
