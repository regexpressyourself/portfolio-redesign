const path = require('path');
const express = require('express');
const request = require('request');

module.exports = app => {
  app.get('/oops', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mail-error.html'));
  });
  app.get('/resume.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static/documents/style.css'));
  });
  app.get('/resume.json', (req, res) => {
    const resume = require('../public/static/documents/resume.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(JSON.parse(JSON.stringify(resume)), null, 4));
  });
  app.get('/resume.pdf', (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=SamMessinaResume.pdf',
    );
    res.sendFile(
      path.join(__dirname, '../public/static/documents/SamMessinaResume.pdf'),
    );
  });
  app.get('/resume', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../public/static/documents/resume.html'),
    );
  });
  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/robots.txt'));
  });

  app.use('/', express.static('public'));
  app.use('/docs', express.static('public/static/documents'));
  app.use('/images', express.static('public/static/images'));
  app.use('/sm', express.static('public/static/images/sm.png'));
  app.use('/css', express.static('public/static/css'));
  app.use('/js', express.static('public/static/js'));
  app.use('/fonts', express.static('public/static/fonts'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static/dist/index.html'));
    return;
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/404.html'));
  });
};
