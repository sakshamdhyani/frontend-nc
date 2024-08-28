import React from 'react'
import "./refundReturns.css"

const RefundReturns = () => {
  return (
    <div className='refundReturnsBody'>

        <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 md:mb-10 lg:mb-12'>
            Return Policy for Consumer Electronics Goods Company
        </h3>

        <p>At our company, we want our customers to be satisfied with their purchases, and we understand that there may be cases where a return is necessary. Our return policy applies to all consumer electronics goods purchased directly from us or our authorized dealers.</p>

        <p>Please read the following return policy carefully and contact our customer service team to initiate the return process.</p>

        <h2>1. Return Eligibility</h2>

        <p>A product can only be returned if it meets the following criteria:</p>

        <ul>
            <li>The product is in its original packaging, including all original accessories, manuals, and warranty cards.</li>
            <li>The product has not been opened or used.</li>
            <li>The product is not damaged or faulty due to misuse, abuse, or neglect.</li>
            <li>The return is initiated within the specified return period as mentioned in the following section.</li>
        </ul>

        <h2>2. Return Period and Terms</h2>

        <ul>
            <li>For unused and unopened products, we provide a return period of 14 days from the date of delivery. If the product is not returned within 14 days, the return request will not be accepted.</li>
            <li>If the product is damaged or faulty due to manufacturing defects, we provide a warranty period as specified in the product manual or warranty card. In such cases, we will repair or replace the product based on the warranty terms.</li>
            <li>Products that are not eligible for returns include software, consumables, and any item that is labeled as “final sale” or “non-returnable.”</li>
        </ul>

        <h2>3. Return Procedure</h2>

        <ul>
            <li>Contact our customer service team through phone or email to initiate a return request within the specified timeframe.</li>
            <li>Provide your order number, product details, and reason for return.</li>
            <li>Our customer service team will provide you with a return authorization number and instructions for returning the product.</li>
            <li>Pack the product securely in the original packaging and ensure that all original accessories are included.</li>
            <li>Label the package with the return authorization number provided by our customer service team.</li>
            <li>Ship the package to the address provided by our customer service team. We recommend using a shipping method that provides tracking and insurance for the value of the product.</li>
            <li>Once we receive the product and verify its eligibility for return, we will initiate the refund or replacement process.</li>
        </ul>

        <h2>4. Refund/Replacement Policy</h2>

        <ul>
            <li>Once we receive and verify the product’s eligibility for return, we will initiate the refund or replacement process within 7 business days.</li>
            <li>If the product is eligible for refund, we will refund the purchase price, minus any shipping and handling fees, using the original payment method used for the purchase.</li>
            <li>If the product is eligible for replacement, we will ship the replacement product to you within a reasonable timeframe.</li>
        </ul>

        <p>We hope this return policy provides clarity on the process and terms for product returns. If you have any further questions, please contact our customer service team.</p>

    </div>
  )
}

export default RefundReturns