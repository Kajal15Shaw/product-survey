const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default (emails) => {
    const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};