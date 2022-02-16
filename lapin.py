import smtplib

server = smtplib.SMTP_SSL('smtp-pawolanmwen.alwaysdata.net', 465)
server.login("sandbox@loryleticee.com", "myqTem-0dejnu-wytwaw")
server.sendmail("sandbox@loryleticee.com", "", "subject : Nouvelle image dispo sur le server. Boop.")
server.quit()