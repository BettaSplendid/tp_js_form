import smtplib

server = smtplib.SMTP_SSL('smtp-pawolanmwenn.alwaysdata.net', 465)
server.login("sandbox@loryleticee.com", "myqTem-0dejnu-wytwaw")
server.sendmail("sandbox@loryleticee.com", "infos@loryleticee.fr", "subject : Nouvelle image dispo sur le server. Boop.")
server.quit()