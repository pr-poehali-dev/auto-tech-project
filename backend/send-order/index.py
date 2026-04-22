import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TO_EMAIL = "dushkinev@yandex.ru"
FROM_EMAIL = "dushkinev@yandex.ru"
SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 465


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет письмо на почту владельца."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    tech = body.get("tech", "не указана")
    date = body.get("date", "не указана")
    name = body.get("name", "не указано")
    phone = body.get("phone", "не указан")
    comment = body.get("comment", "")

    subject = f"Новая заявка с сайта — {tech}"

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #ffffff; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 22px; color: #000;">🚛 Новая заявка на технику</h1>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #999; width: 40%;">Техника</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #fbbf24; font-weight: bold;">{tech}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #999;">Дата выезда</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #ffffff; font-weight: bold;">{date}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #999;">Имя</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #ffffff;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15; color: #999;">Телефон</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #ffffff15;">
              <a href="tel:{phone}" style="color: #34d399; font-weight: bold; text-decoration: none;">{phone}</a>
            </td>
          </tr>
          {"<tr><td style='padding: 12px 0; color: #999;'>Комментарий</td><td style='padding: 12px 0; color: #ffffff;'>" + comment + "</td></tr>" if comment else ""}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #ffffff08; font-size: 12px; color: #555;">
        Заявка получена с сайта СПЕЦТЕХНИКА
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html, "html", "utf-8"))

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
