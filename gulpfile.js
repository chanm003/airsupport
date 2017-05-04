var gulp = require('gulp'),
    rename = require("gulp-rename"),
    replace = require("gulp-string-replace");

var aspxHeader = 
`<!DOCTYPE html>
<%@ Page %>
<%@ Register Tagprefix="SharePoint" 
    Namespace="Microsoft.SharePoint.WebControls" 
    Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>`;

var formDigestTag = `
  <form runat="server">
    <SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
  </form>`;

gulp.task('aspx', function() {
    return gulp.src("./dist/index.html")
        .pipe(replace(new RegExp("<!DOCTYPE.*?>", 'i'), aspxHeader))
        .pipe(replace(new RegExp("<base.*?>", 'i'), '<base href="./index.aspx">'))
        .pipe(replace(new RegExp(`<body class="app">`, 'i'), `<body class="app">`+formDigestTag))
        .pipe(rename("index.aspx"))
        .pipe(gulp.dest("./dist"));
});