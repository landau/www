(ns www.views.layout
  (:require
    [hiccup.page :refer [html5 include-css include-js]]
    [hiccup.element :refer [link-to]]))
; start repo
(defn repo
  "github repo layout"
  [{:keys [name html_url description updated_at stargazers_count]}]
  [:div.row
   [:div.col-sm-9
    [:h3 (link-to {:target "_blank"} html_url name)]
    [:h4 [:small.text-muted description]]]
   [:div.col-sm-3
    [:dl.side-list
     [:dt "Last Updated"] [:dd updated_at]
     [:dt "Stargazers"] [:dd stargazers_count]]]])
; end repo

; start goog-analytics
(defn goog-analytics []
  [:script
   "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\nga('create', 'UA-36148349-2', 'trevorlandau.net');\nga('send', 'pageview');\n"])
; end goog-analytics

; start sidebar
(defn sidebar []
  [:div#sidebar.column.col-sm-3
   [:a.logo {:href "/"} "Trevor Landau"]
   [:ul.nav.navbar-nav.social
    [:li
     [:a
      {:target "_blank", :href "https://twitter.com/trevor_landau"}
      [:i.fa.fa-twitter]]]
    [:li
     [:a
      {:target "_blank", :href "https://github.com/landau"}
      [:i.fa.fa-github]]]]])
; end sidebar

; start main
(defn main [{:keys [repos]}]
  [:div#main.column.col-sm-9
   [:div.padding
    [:div.col-sm-12
     [:div.page-header.text-muted.divider "Github Repos"]
     (map repo repos)]]])
; end main

; start base
(defn base
  "Base html"
  [& body]
  (html5
    {:lang "en"}
    [:head
     [:meta {:charset "utf8"}]
     [:title "Trevor Landau"]
     [:meta
      {:content "width=device-width, initial-scale=1, maximum-scale=1",
       :name "viewport"}]
     (include-css "http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css")
     (include-css "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css")
     (include-css "http://fonts.googleapis.com/css?family=Open+Sans:200,300,400,600,700")
     (include-css "/css/main.css")]
    [:body body]))
; end base

; start common
(defn common [& [repos]]
  (base
    [:div.wrapper
     [:div.box
      [:div.row
       (sidebar)
       (main repos)]]]))
; end common
