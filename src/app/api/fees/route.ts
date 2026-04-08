import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  try {
    const { amount }: { amount: number } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Valid amount is required' },
        { status: 400 }
      );
    }

    const receipt = `receipt_${Date.now()}`;
    const options = {
      amount: amount * 100, // in paisa
      currency: 'INR',
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Razorpay Error:', err);
    return NextResponse.json(
      {
        message: 'Order creation failed',
        error: err?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
