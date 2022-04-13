const transporter = require("./configs/mail");
require("dotenv").config();

const appliedSuccessfully = async (user, admin) => {
  await transporter.sendMail({
    from: `${admin.jobSchemaId.companyName}   <${admin.jobSchemaId.adminSchemaId.email}`,
    to: user.email,
    subject: `Applied For ${admin.jobSchemaId.jobTitle} at ${admin.jobSchemaId.companyName}`,
    text: `Hi ${
      user.firstName + " " + user.lastName
    } , You applied for this job successfully , stay tuned for new updates!!!`,
  });
};

const shortlistedSuccessfully = async (user, admin) => {
  await transporter.sendMail({
    from: `${admin.jobSchemaId.companyName}    <${admin.jobSchemaId.adminSchemaId.email}`,
    to: user.email,
    subject: `Congratulations , you are shortlisted for ${admin.jobSchemaId.jobTitle} at ${admin.jobSchemaId.companyName}`,
    text: `Congratulations ${
      user.firstName + " " + user.lastName
    } , you are shortlisted for ${admin.jobSchemaId.jobTitle} at ${
      admin.jobSchemaId.companyName
    } and your interview will be schedule within 2-3 days !!!`,
  });
};

const interviewScheduled = async (user, admin) => {
  await transporter.sendMail({
    from: `${admin.jobSchemaId.companyName}   <${admin.jobSchemaId.adminSchemaId.email}`,
    to: user.email,
    subject: `Interview scheduled For ${admin.jobSchemaId.jobTitle} at ${admin.jobSchemaId.companyName}`,
    text: `Hi ${
      user.firstName + " " + user.lastName
    } , You interview is scheduled on ${
      user.interviewDateTime
    } and use this link "click here" for meet`,
  });
};

const selectedResult = async (user, admin) => {
  await transporter.sendMail({
    from: `${admin.jobSchemaId.companyName}   <${admin.jobSchemaId.adminSchemaId.email}`,
    to: user.email,
    subject: `Congratulations you are hired For ${admin.jobSchemaId.jobTitle} at ${admin.jobSchemaId.companyName}`,
    text: `Hi ${user.firstName + " " + user.lastName} , welcome to ${
      admin.jobSchemaId.companyName
    } family , as a ${
      admin.jobSchemaId.jobTitle
    } !!! , for futher updates we will reached out to you!!!`,
  });
};

const rejectedResult = async (user, admin) => {
  await transporter.sendMail({
    from: `${admin.jobSchemaId.companyName}   <${admin.jobSchemaId.adminSchemaId.email}`,
    to: user.email,
    subject: `Results For ${admin.jobSchemaId.jobTitle} at ${admin.jobSchemaId.companyName}`,
    text: `Hi ${
      user.firstName + " " + user.lastName
    } , We regret to inform you that your performance for the ${
      admin.jobSchemaId.jobTitle
    } at ${
      admin.jobSchemaId.companyName
    } is below the expected level, and you have not cleared the interview !!!`,
  });
};

module.exports = {
  appliedSuccessfully,
  shortlistedSuccessfully,
  interviewScheduled,
  selectedResult,
  rejectedResult,
};



