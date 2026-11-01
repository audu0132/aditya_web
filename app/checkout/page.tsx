"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", pin: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())              e.name = "Required";
    if (!form.email.includes("@"))      e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone))   e.phone = "10-digit mobile required";
    if (!form.address.trim())           e.address = "Required";
    if (!form.city.trim())              e.city = "Required";
    if (!form.state.trim())             e.state = "Required";
    if (!/^\d{6}$/.test(form.pin))      e.pin = "Valid 6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // ⚠️  Payment integration placeholder — connect your payment gateway here
    setSubmitted(true);
  };

  if (totalItems === 0 && !submitted) {
    return (
      <div className="pt-32 text-center px-4 pb-24">
        <h1 className="text-3xl font-black mb-4">YOUR BAG IS EMPTY</h1>
        <Link href="/shop" className="inline-block bg-zinc-950 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-32 text-center px-4 pb-24">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-3xl font-black mb-3">ORDER PLACED!</h1>
        <p className="text-zinc-500 text-sm mb-2">Thank you, {form.name.split(" ")[0]}! Your order summary has been sent to <strong>{form.email}</strong>.</p>
        <p className="text-xs text-zinc-400 mb-8">
          ⚠️ Payment integration is not yet connected. No payment was charged.
          <br />Connect a payment gateway (Razorpay, Stripe, PayU) to go live.
        </p>
        <Link href="/" className="inline-block bg-zinc-950 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors">
          BACK TO HOME
        </Link>
      </div>
    );
  }

  const Field = ({
    label, name, type = "text", placeholder, half,
  }: { label: string; name: keyof typeof form; type?: string; placeholder?: string; half?: boolean }) => (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label className="block text-xs font-bold tracking-widest text-zinc-500 mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-zinc-950 transition-colors ${errors[name] ? "border-red-400" : "border-zinc-200"}`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-10">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <h2 className="text-xs font-bold tracking-widest text-zinc-500">CUSTOMER DETAILS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" placeholder="Aditya Kumar" />
              <Field label="Email" name="email" type="email" placeholder="hello@email.com" half />
              <Field label="Mobile" name="phone" type="tel" placeholder="9876543210" half />
            </div>

            <h2 className="text-xs font-bold tracking-widest text-zinc-500 pt-2">DELIVERY ADDRESS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Address" name="address" placeholder="House/Flat no., Street, Area" />
              <Field label="City" name="city" placeholder="Mumbai" half />
              <Field label="State" name="state" placeholder="Maharashtra" half />
              <Field label="PIN Code" name="pin" placeholder="400001" half />
            </div>

            {/* Payment placeholder */}
            <div className="border border-dashed border-amber-400 bg-amber-50 rounded px-4 py-4 text-xs text-amber-700 space-y-1">
              <p className="font-bold">⚠️ Payment Integration Required</p>
              <p>This project is in development. Connect a payment gateway to go live.</p>
              <p>Suggested: <strong>Razorpay</strong>, Stripe, or PayU.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-950 text-white py-4 text-sm font-bold tracking-widest hover:bg-zinc-800 transition-colors"
            >
              PLACE ORDER (TEST)
            </button>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-2">
            <h2 className="text-xs font-bold tracking-widest text-zinc-500 mb-4">ORDER SUMMARY</h2>
            <div className="space-y-4 border-b border-zinc-100 pb-4 mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="flex gap-3">
                  <div className="relative w-14 h-16 bg-zinc-50 flex-shrink-0 overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-zinc-950 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight truncate">{item.product.name}</p>
                    <p className="text-xs text-zinc-400">{item.color.name} · {item.size}</p>
                  </div>
                  <p className="text-sm font-bold">₹{(item.product.price * item.qty).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-zinc-100">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

