(defproject www "0.1.0-SNAPSHOT"
  :description "My websit"
  :url "https://bitbucket.org/trevor_landau/www"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.1.6"]
                 [tentacles "0.2.6"]
                 [lib-noir "0.8.2"]
                 [hiccup "1.0.5"]
                 [ring-server "0.3.1"]]
  :plugins [[lein-ring "0.8.10"]]
  :ring {:handler www.handler/app
         :init www.handler/init
         :destroy www.handler/destroy}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [org.clojure/tools.namespace "0.2.4"]
                        [ring-mock "0.1.5"]
                        [ring/ring-devel "1.2.1"]]
         :source-paths ["dev"]}
   :production {:ring
                {:open-browser? false
                 :stacktraces? false
                 :auto-reload? false}}})
