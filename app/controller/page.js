
var Page = require('../models/Page');
var User = require('../models/User');

exports.getPagesById = function(req, res) {

    //get all users based on id
    Page.findById(req.params.id, function(err, page) {
        if (err)
            res.json({
                "Error": err
            });
        else
            res.json(page);
    });
};


exports.getPages = function(req, res) {
  Page.find(function(err, pages) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(pages);
    }
  });
};

exports.putPagesById= function(req,res){
  
  Page.findById(req.params.id,function(err,page){
    if(err)
      res.json({"Error":err})
    else
      page.pagename=req.body.pagename;
      page.description=req.body.description;
      
      page.save(function(err) {
            if (err)
                res.json({
                    'ERROR': err
                });
            else
                res.json({
                    'success': page
                });
        });
    
  })
  
};

exports.postPage = function(req, res) {

    var page = new Page({
        pagename: req.body.pagename,
        description: req.body.description
    });

    page.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': page
            });
    });
};

exports.deletePage = function(req, res) {
    Page.findById(req.params.id, function(err, page) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            page.remove(function(err) {
                if (err)
                    res.json({'ERROR': err});
                else
                    res.json({'success': page});
            });
    });
};


exports.addModerator = function(req,res){
  Page.findById(req.params.id, function(err, page){
    if (err)
      res.json({"ERROR":err})
    page.pageMod = req.body.pageMod;
    
    page.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': page
            });
    });
    
  });
  
}; 
