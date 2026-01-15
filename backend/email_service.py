import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        self.smtp_user = os.environ.get("SMTP_USER", "")
        self.smtp_password = os.environ.get("SMTP_PASSWORD", "")
        self.from_email = os.environ.get("FROM_EMAIL", self.smtp_user)
        self.admin_email = os.environ.get("ADMIN_EMAIL", "admin@dexaura.com")
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        body_html: str,
        body_text: str = None
    ):
        """Send email using SMTP"""
        if not self.smtp_user or not self.smtp_password:
            logger.warning("SMTP credentials not configured, skipping email")
            return False
        
        try:
            message = MIMEMultipart("alternative")
            message["From"] = self.from_email
            message["To"] = to_email
            message["Subject"] = subject
            
            if body_text:
                part1 = MIMEText(body_text, "plain")
                message.attach(part1)
            
            part2 = MIMEText(body_html, "html")
            message.attach(part2)
            
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_password,
                start_tls=True
            )
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    async def notify_admin_new_order(self, order_data: dict):
        """Notify admin about new order"""
        subject = f"New Order: {order_data['order_number']}"
        body_html = f"""
        <html>
        <body>
            <h2>New Order Received</h2>
            <p><strong>Order Number:</strong> {order_data['order_number']}</p>
            <p><strong>Customer ID:</strong> {order_data['customer_id']}</p>
            <p><strong>Total Amount:</strong> ${order_data['total_amount']:.2f}</p>
            <p><strong>Order Type:</strong> {order_data['order_type']}</p>
            <p><strong>Status:</strong> {order_data['status']}</p>
            <p>Please review in the admin dashboard.</p>
        </body>
        </html>
        """
        await self.send_email(self.admin_email, subject, body_html)
    
    async def notify_admin_contact_submission(self, submission: dict):
        """Notify admin about new contact form submission"""
        subject = f"New Contact Submission: {submission['submission_type']}"
        body_html = f"""
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Type:</strong> {submission['submission_type']}</p>
            <p><strong>Name:</strong> {submission['name']}</p>
            <p><strong>Email:</strong> {submission['email']}</p>
            <p><strong>Company:</strong> {submission.get('company', 'N/A')}</p>
            <p><strong>Phone:</strong> {submission.get('phone', 'N/A')}</p>
            <p><strong>Message:</strong></p>
            <p>{submission['message']}</p>
        </body>
        </html>
        """
        await self.send_email(self.admin_email, subject, body_html)
    
    async def notify_admin_quote_request(self, quote_data: dict):
        """Notify admin about new quote request"""
        subject = "New Quote Request"
        body_html = f"""
        <html>
        <body>
            <h2>New Quote Request</h2>
            <p><strong>Quote ID:</strong> {quote_data['id']}</p>
            <p><strong>Customer ID:</strong> {quote_data['customer_id']}</p>
            <p><strong>Type:</strong> {quote_data['quote_type']}</p>
            <p><strong>Parts:</strong> {len(quote_data['parts'])}</p>
            <p><strong>Total Price:</strong> ${quote_data['total_price']:.2f}</p>
            <p>Please review in the admin dashboard.</p>
        </body>
        </html>
        """
        await self.send_email(self.admin_email, subject, body_html)

email_service = EmailService()
