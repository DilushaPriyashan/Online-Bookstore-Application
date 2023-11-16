import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';

const Help = () => {
    return (
        <div className="div-help">
            <h1 >
                Help Center
            </h1>
            <p>Welcome to our Online Book Store's Help Center. We're here to assist you with any questions or concerns you may have. Browse our frequently asked questions below or contact our support team for personalized assistance.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <h5>1. How do I place an order?</h5>
            <p>To place an order, follow these simple steps:</p>
            <p>-Register in out site.</p>
            <p>-Login to you account.</p>
            <p>-Browse our collection and find the books you want.</p>
            <p>-Click the "Add to Cart" button on the bottom of the book's card.</p>
            <p>-Review your order and click the complete order button in the cart.</p>
            <p>-Confirm your order placement.</p>

            <h5>2.What payment methods are accepted?</h5>
            <p>We accept various payment methods, including credit cards, debit cards, and PayPal. You can choose your preferred payment method during the checkout process.</p>

            <h5>3.Can I return or exchange a book?</h5>
            <p>Can I return or exchange a book?</p>

            <h5>4.How do I contact customer support?</h5>
            <p>Our customer support team is available to assist you. You can reach us via email at support@chnbookstore.com or through our Contact Us page.</p>

            <div className='help-bottom'>
                <h3>Contact Information</h3>
                <ListGroup className='py-2'>
                    <ListGroup.Item>Email : chnonlinebookstore@gmail.com</ListGroup.Item>
                    <ListGroup.Item>Contaact : 1-800-123-4567</ListGroup.Item>
                    <ListGroup.Item>Address : 123 Bookstore Lane, City, Country</ListGroup.Item>

                </ListGroup>
                <p>
                    If you have any other questions or need assistance with a specific issue, please don't hesitate to reach out to our customer support team. We're here to help!
                </p>
                <p>Thank you for choosing our Online Book Store.

                </p>
            </div>


        </div>
    )
}


export default Help;
