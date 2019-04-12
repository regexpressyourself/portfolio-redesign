const path = require('path');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const express = require('express');
const request = require("request");
require('dotenv').config()

const auth = {
  auth: {
    api_key: process.env.MG_KEY,
    domain: 'sandbox2df17558b974464bb637958019d216f4.mailgun.org'
  }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports = (app) => {
  // POST route from contact form
  app.post('/contact', function (req, res) {
    let emailText = `${req.body.name} (${req.body.email}) says: ${req.body.message}`;
    nodemailerMailgun.sendMail({
      from: req.body.email,
      to: 'samuel.messina@gmail.com',
      subject: 'New message from smessina.com',
      html: `<p>New message from: <b>${req.body.name}</b> (<a href="mailto:${req.body.email}">${req.body.email}</a>)</p>
<p><em>Message:</em><br />${req.body.message}</p>
      `
    }, (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
        res.redirect('/oops');
      }
      else {
        console.log(`Response: ${info}`);
        res.redirect('/thank-you');
      }
    });
    return;
  });

  app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/thank-you.html'));
  });
  app.get('/oops', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mail-error.html'));
  });
  app.get('/resume.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static/documents/style.css'));
  });
  app.get('/resume.json', (req, res) => {
    const resume = require('../public/static/documents/resume.json')
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(JSON.parse(JSON.stringify(resume)), null, 4));
  });
  app.get('/resume.pdf', (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=SamMessinaResume.pdf');
    res.sendFile(path.join(__dirname, '../public/static/documents/SamMessinaResume.pdf'));
  });
  app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static/documents/resume.html'));
  });
  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/robots.txt'));
  });

  app.use('/', express.static('public'));
  app.use('/docs', express.static('public/static/documents'));
  app.use('/images', express.static('public/static/images'));
  app.use('/css', express.static('public/static/css'));
  app.use('/js', express.static('public/static/js'));
  app.use('/fonts', express.static('public/static/fonts'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    return;
  });

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/404.html'));
  });
};

