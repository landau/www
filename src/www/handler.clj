(ns www.handler
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [compojure.core :refer [defroutes routes GET]]
            [noir.util.middleware :as noir-middleware]
            [www.routes.home :refer [home-routes]]))

(defn init []
  )

(defn destroy []
  )

(defroutes app-routes
  (route/resources "/")
  (route/resources "/life" :root "life")
  (route/not-found "Not Found"))

(def app
  (noir-middleware/app-handler
    [home-routes
     app-routes]))
