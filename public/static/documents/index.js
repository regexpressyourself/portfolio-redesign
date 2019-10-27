var fs = require('fs');
var _ = require('lodash');
var Mustache = require('mustache');
var schema = require('resume-schema');

var d = new Date();
var curyear = d.getFullYear();

const getMonth = (monthNum, long = true) => {
  let monthString;
  switch (monthNum) {
    case '01':
      monthString = long ? 'January ' : 'Jan. ';
      break;
    case '02':
      monthString = long ? 'February ' : 'Feb. ';
      break;
    case '03':
      monthString = long ? 'March ' : 'March ';
      break;
    case '04':
      monthString = long ? 'April ' : 'April ';
      break;
    case '05':
      monthString = long ? 'May ' : 'May ';
      break;
    case '06':
      monthString = long ? 'June ' : 'June ';
      break;
    case '07':
      monthString = long ? 'July ' : 'July ';
      break;
    case '08':
      monthString = long ? 'August ' : 'Aug.';
      break;
    case '09':
      monthString = long ? 'September ' : 'Sept. ';
      break;
    case '10':
      monthString = long ? 'October ' : 'Oct. ';
      break;
    case '11':
      monthString = long ? 'November ' : 'Nov. ';
      break;
    case '12':
      monthString = long ? 'December ' : 'Dec. ';
      break;
    default:
      monthString = long ? 'Month ' : 'mo. ';
      break;
  }
  return monthString;
};

function render(isShort = false) {
  let resumeObject = JSON.parse(fs.readFileSync('./resume.json'));
  if (isShort) {
    resumeObject = JSON.parse(fs.readFileSync('./resume--short.json'));
  }
  let styles = fs.readFileSync('./style.css');
  resumeObject.styles = styles;
  resumeObject.basics.capitalName = resumeObject.basics.name.toUpperCase();
  //resumeObject.basics.capitalLabel = (resumeObject.basics.label).toUpperCase();

  if (resumeObject.basics.email) {
    resumeObject.emailBool = true;
  }

  if (resumeObject.basics.phone) {
    resumeObject.phoneBool = true;
  }

  if (resumeObject.basics.picture) {
    resumeObject.pictureBool = true;
  }

  if (resumeObject.basics.website) {
    resumeObject.websiteBool = true;
  }

  if (resumeObject.basics.summary) {
    resumeObject.aboutBool = true;
  }

  if (resumeObject.basics.profiles) {
    if (resumeObject.basics.profiles[0].network) {
      _.each(resumeObject.basics.profiles, function(w) {
        if (
          (w.network == 'Twitter' || w.network == 'twitter') &&
          w.url == '' &&
          w.username != ''
        ) {
          w.url = 'https://twitter.com/' + w.username;
        }
        if (
          (w.network == 'facebook' ||
            w.network == 'Facebook' ||
            w.network == 'FaceBook') &&
          w.url == '' &&
          w.username != ''
        ) {
          w.url = 'https://facebook.com/' + w.username;
        }
        if (
          (w.network == 'Linkedin' ||
            w.network == 'linkedin' ||
            w.network == 'LinkedIn') &&
          w.url == '' &&
          w.username != ''
        ) {
          w.url = 'https://linkedin.com/in/' + w.username;
        }
      });
    }
  }

  if (resumeObject.work) {
    if (resumeObject.work[0].company) {
      resumeObject.workBool = true;
      _.each(resumeObject.work, function(w) {
        if (w.startDate) {
          w.startDateYear = (w.startDate || '').substr(0, 4);
          w.startDateMonth = getMonth(w.startDate.substr(5, 2), false);
        }
        if (w.endDate) {
          w.endDateYear = (w.endDate || '').substr(0, 4);
          w.endDateMonth = getMonth((w.endDate || '').substr(5, 2), false);
        } else {
          w.endDateYear = 'Present';
        }
        if (w.highlights) {
          if (w.highlights[0]) {
            if (w.highlights[0] != '') {
              w.workHighlights = true;
            }
          }
        }
      });
    }
  }

  if (resumeObject.education) {
    if (resumeObject.education[0].institution) {
      resumeObject.educationBool = true;
      _.each(resumeObject.education, function(e) {
        if (!e.area || !e.studyType) {
          e.educationDetail =
            (e.area == null ? '' : e.area) +
            (e.studyType == null ? '' : e.studyType);
        } else {
          e.educationDetail = e.area + ', ' + e.studyType;
        }
        if (e.gpa) {
          e.gpaBool = true;
        }
        if (e.startDate) {
          e.startDateYear = e.startDate.substr(0, 4);
          e.startDateMonth = getMonth(e.startDate.substr(5, 2), false);
        } else {
          e.endDateMonth = '';
        }
        if (e.endDate) {
          e.endDateYear = e.endDate.substr(0, 4);
          e.endDateMonth = getMonth(e.endDate.substr(5, 2), false);
          if (e.endDateYear > curyear) {
            e.endDateYear += ' (expected)';
          }
        } else {
          e.endDateYear = 'Present';
          e.endDateMonth = '';
        }
        if (e.courses) {
          if (e.courses[0]) {
            if (e.courses[0] != '') {
              e.educationCourses = true;
            }
          }
        }
      });
    }
  }

  if (resumeObject.awards) {
    if (resumeObject.awards[0].title) {
      resumeObject.awardsBool = true;
      _.each(resumeObject.awards, function(a) {
        a.year = (a.date || '').substr(0, 4);
        a.day = (a.date || '').substr(8, 2);
        a.month = getMonth((a.date || '').substr(5, 2));
      });
    }
  }

  if (resumeObject.publications) {
    if (resumeObject.publications[0].name) {
      resumeObject.publicationsBool = true;
      _.each(resumeObject.publications, function(a) {
        a.year = (a.releaseDate || '').substr(0, 4);
        a.day = (a.releaseDate || '').substr(8, 2);
        a.month = getMonth((a.releaseDate || '').substr(5, 2));
      });
    }
  }

  if (resumeObject.volunteer) {
    if (resumeObject.volunteer[0].position) {
      resumeObject.volunteerBool = true;
      _.each(resumeObject.volunteer, function(a) {
        a.startDateYear = (a.startDate || '').substr(0, 4);
        a.startDateMonth = getMonth((a.startDate || '').substr(5, 2));
        a.endDateYear = (a.endDate || '').substr(0, 4);
        a.endDateMonth = getMonth((a.endDate || '').substr(5, 2));
        if (a.highlights) {
          if (a.highlights[0]) {
            if (a.highlights[0] != '') {
              a.volunterHighlights = true;
            }
          }
        }
      });
    }
  }

  if (resumeObject.skills) {
    if (resumeObject.skills[0].name) {
      resumeObject.skillsBool = true;
    }
  }

  if (resumeObject.interests) {
    if (resumeObject.interests[0].name) {
      resumeObject.interestsBool = true;
    }
  }

  if (resumeObject.languages) {
    if (resumeObject.languages[0].language) {
      resumeObject.languagesBool = true;
    }
  }

  if (resumeObject.references) {
    if (resumeObject.references[0].name) {
      resumeObject.referencesBool = true;
    }
  }

  let theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
  if (isShort) {
    theme = fs.readFileSync(__dirname + '/resume--short.template', 'utf8');
  }
  var resumeHTML = Mustache.render(theme, resumeObject);

  return resumeHTML;
}

fs.writeFileSync('resume.html', render());
module.exports = {
  render: render,
};
