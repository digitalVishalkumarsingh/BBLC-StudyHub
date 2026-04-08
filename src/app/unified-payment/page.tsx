// 'use client';
// import React, { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from 'next/navigation';
// import Image from "next/image";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export default function UnifiedPaymentPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [formdata, setFormdata] = useState({
//     userName: "",
//     userEmail: "",
//     plan: "",
//     course: "",
//     planAmount: 0,
//     registrationFee: 50,
//     totalAmount: 0,
//     paymentStatus: "pending",
//     order_id: "",
//     razorpay_payment_id: "",
//     startDate: new Date().toISOString().split('T')[0],
//     endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
//   });

//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const [hasRegistrationFee, setHasRegistrationFee] = useState<boolean>(false);
//   const [checkingRegistration, setCheckingRegistration] = useState<boolean>(false);
//   const [isFirstTimePayment, setIsFirstTimePayment] = useState<boolean>(true);
//   const [latestPayment, setLatestPayment] = useState(null);
//   const [canPay, setCanPay] = useState(true);
//   const [planExpired, setPlanExpired] = useState(false);


//   // Define batch options and their prices
//   const batchOptions = [
//     { label: 'Morning Batch', value: 'Morning Batch', amount: 650 },
//     { label: 'Mid Morning Batch', value: 'Mid Morning Batch', amount: 800 },
//     { label: 'Afternoon Batch', value: 'Afternoon Batch', amount: 1200 },
//     { label: 'Full Day Batch', value: 'Full Day Batch', amount: 1500 },
//   ];

//   // Define monthly plans with their amounts (legacy, for compatibility)
//   const planAmounts = {
//     "Basic": 500,
//     "Standard": 800,
//     "Premium": 1200,
//   };

//   // Define courses for registration
//   const courseAmounts = {
//     "Course A": 1000,
//     "Course B": 1500,
//     "Course C": 2000,
//   };

//   // Load user data from localStorage and query params
//   useEffect(() => {
//     const userName = localStorage.getItem('userName');
//     const userEmail = localStorage.getItem('userEmail');

//     // Redirect to login if user is not logged in
//     if (!userName) {
//       router.replace('/login');
//       return;
//     }

//     // Read batch from query params only (ignore plan param for backend compatibility)
//     const batchParam = searchParams.get('batch');

//     // Map batch to legacy plan name for backend compatibility
//     let plan = '';
//     if (batchParam) {
//       if (batchParam === 'Morning Batch') plan = 'Basic';
//       else if (batchParam === 'Mid Morning Batch') plan = 'Standard';
//       else if (batchParam === 'Afternoon Batch' || batchParam === 'Full Day Batch') plan = 'Premium';
//     }

//     setFormdata(prev => ({
//       ...prev,
//       userName: userName || '',
//       userEmail: userEmail || '',
//       course: batchParam || prev.course,
//       plan: plan || prev.plan
//     }));

//     if (userEmail) {
//       checkRegistrationStatus(userEmail);
//     }
//   }, [searchParams]);

//   // Check if user has paid registration fee
//   const checkRegistrationStatus = async (userEmail: string) => {
//     try {
//       setCheckingRegistration(true);
//       const res = await fetch(`/api/check-registration?userEmail=${userEmail}`);
//       const data = await res.json();

//       if (res.ok) {
//         setHasRegistrationFee(data.hasRegistrationFee);
//         setIsFirstTimePayment(!data.hasRegistrationFee);
//         console.log('Registration status:', data);
//       }
//     } catch (error) {
//       console.error('Error checking registration:', error);
//     } finally {
//       setCheckingRegistration(false);
//     }
//   };

//   // Update total amount when batch or registration status changes
//   useEffect(() => {
//     if (formdata.course) {
//       const batch = batchOptions.find(b => b.value === formdata.course);
//       const planAmount = batch ? batch.amount : 0;
//       const registrationFee = isFirstTimePayment ? 50 : 0;
//       const totalAmount = planAmount + registrationFee;

//       setFormdata(prev => ({
//         ...prev,
//         planAmount,
//         registrationFee,
//         totalAmount
//       }));
//     }
//   }, [formdata.course, isFirstTimePayment]);

//   // Fetch latest monthly payment for user
//   useEffect(() => {
//     const fetchLatestPayment = async () => {
//       if (!formdata.userEmail) return;
//       try {
//         const res = await fetch(`/api/monthly-payment?userEmail=${formdata.userEmail}`);
//         const data = await res.json();
//         if (res.ok && Array.isArray(data.data) && data.data.length > 0) {
//           const latest = data.data[0]; // sorted by createdAt desc in API
//           setLatestPayment(latest);
//           const now = new Date();
//           const end = new Date(latest.endDate);
//           if (latest.paymentStatus === 'Paid' && end >= now) {
//             setCanPay(false);
//             setPlanExpired(false);
//             setMessage(`You already paid the fee for this month. Next due: ${end.toLocaleDateString('en-IN')}`);
//           } else if (end < now) {
//             setCanPay(true);
//             setPlanExpired(true);
//             setMessage('Your plan has expired. Please pay the fee to renew.');
//           } else {
//             setCanPay(true);
//             setPlanExpired(false);
//           }
//         } else {
//           setCanPay(true);
//           setPlanExpired(true);
//         }
//       } catch (err) {
//         setCanPay(true);
//         setPlanExpired(false);
//       }
//     };
//     fetchLatestPayment();
//     // eslint-disable-next-line
//   }, [formdata.userEmail]);

//   // Load Razorpay script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle payment process
//   const handlePayment = async () => {
//     try {
//       // Create order for the total amount
//       const res = await fetch("/api/monthly-fee", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: formdata.totalAmount,
//           plan: formdata.plan,
//           isFirstTimePayment: isFirstTimePayment,
//           registrationFee: formdata.registrationFee,
//           planAmount: formdata.planAmount
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data?.order_id) {
//         setMessage("Order creation failed.");
//         setLoading(false);
//         return;
//       }

//       // Load Razorpay
//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) {
//         alert("Razorpay SDK failed to load. Are you online?");
//         setLoading(false);
//         return;
//       }

//       // Configure Razorpay options
//       const options = {
//         key: "rzp_test_7VXRc8O89d3bz1",
//         amount: data.amount,
//         currency: data.currency,
//         name: "BBLC Library",
//         description: isFirstTimePayment
//           ? `BBLC Registration Fee + ${formdata.plan} Monthly Plan`
//           : `BBLC ${formdata.plan} Monthly Plan`,
//         order_id: data.order_id,
//         notes: {
//           payment_type: isFirstTimePayment ? 'registration_and_monthly' : 'monthly_only',
//           registration_fee: formdata.registrationFee,
//           plan_fee: formdata.planAmount,
//           total_amount: formdata.totalAmount,
//           plan_name: formdata.plan,
//           user_email: formdata.userEmail,
//           user_name: formdata.userName,
//           // Line items for receipt
//           line_item_1: isFirstTimePayment ? `Registration Fee` : `${formdata.plan} Monthly Plan`,
//           line_item_1_amount: isFirstTimePayment ? formdata.registrationFee : formdata.totalAmount,
//           line_item_2: isFirstTimePayment ? `${formdata.plan} Monthly Plan` : '',
//           line_item_2_amount: isFirstTimePayment ? formdata.planAmount : 0,
//           items_count: isFirstTimePayment ? 2 : 1,
//           breakdown: isFirstTimePayment
//             ? `1. Registration Fee: ₹${formdata.registrationFee} | 2. ${formdata.plan} Monthly Plan: ₹${formdata.planAmount} | Total: ₹${formdata.totalAmount}`
//             : `${formdata.plan} Monthly Plan: ₹${formdata.totalAmount}`
//         },
//         handler: async function (response: any) {
//           await handlePaymentSuccess(response, data.order_id);
//         },
//         prefill: {
//           name: formdata.userName,
//           email: formdata.userEmail,
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//         modal: {
//           ondismiss: () => {
//             setMessage("Payment popup closed without completing payment.");
//             setLoading(false);
//           },
//         },
//       };

//       // Open Razorpay payment form
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('Payment error:', error);
//       setMessage("Error initiating payment.");
//       setLoading(false);
//     }
//   };

//   // Handle successful payment
//   const handlePaymentSuccess = async (response: any, orderId: string) => {
//     try {
//       // If first time payment, save both registration and monthly fee
//       if (isFirstTimePayment) {
//         // Save registration fee
//         const regRes = await fetch("/api/payment", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userName: formdata.userName,
//             userEmail: formdata.userEmail,
//             course: formdata.course || "Library Access",
//             registrationFee: formdata.registrationFee,
//             paymentStatus: "Paid",
//             order_id: orderId,
//             razorpay_payment_id: response.razorpay_payment_id,
//           }),
//         });

//         if (!regRes.ok) {
//           console.error('Failed to save registration fee');
//         }
//       }

//       // Save monthly fee (send both plan and batch for history)
//       const monthlyRes = await fetch("/api/monthly-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userName: formdata.userName,
//           userEmail: formdata.userEmail,
//           plan: formdata.plan,
//           batch: formdata.course, // send batch name for history
//           amount: formdata.planAmount,
//           startDate: formdata.startDate,
//           endDate: formdata.endDate,
//           paymentStatus: "Paid",
//           order_id: orderId,
//           razorpay_payment_id: response.razorpay_payment_id,
//         }),
//       });

//       if (monthlyRes.ok) {
//         // Send confirmation email
//         const sendMail = await fetch("/api/monthly-confirmation", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userName: formdata.userName,
//             userEmail: formdata.userEmail,
//             plan: formdata.plan,
//             amount: formdata.totalAmount,
//             startDate: formdata.startDate,
//             endDate: formdata.endDate,
//             paymentStatus: "Paid",
//             order_id: orderId,
//             razorpay_payment_id: response.razorpay_payment_id,
//             isFirstTimePayment,
//             registrationFee: isFirstTimePayment ? formdata.registrationFee : 0
//           }),
//         });

//         if (sendMail.ok) {
//           setMessage(isFirstTimePayment
//             ? "Registration and monthly fee payment successful! Confirmation email sent."
//             : "Monthly fee payment successful! Confirmation email sent."
//           );
//         } else {
//           setMessage("Payment successful but email confirmation failed.");
//         }

//         // Update registration status
//         setHasRegistrationFee(true);
//         setIsFirstTimePayment(false);
//       } else {
//         setMessage("Payment processed but failed to save details.");
//       }
//     } catch (error) {
//       console.error('Error handling payment success:', error);
//       setMessage("Payment successful but there was an error saving details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form submission handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Validate form
//     if (!formdata.userName || !formdata.userEmail || !formdata.plan) {
//       setMessage("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     if (isFirstTimePayment && !formdata.course) {
//       setMessage("Please select a course for registration.");
//       setLoading(false);
//       return;
//     }

//     await handlePayment();
//   };

//   if (checkingRegistration) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Checking registration status...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Hero Banner */}
//       <div className="w-full h-[300px] relative">
//         <Image
//           src="/heroimg/pexels-pixabay-159775.jpg"
//           alt="Payment Banner"
//           layout="fill"
//           objectFit="cover"
//           className="absolute inset-0 mt-20 mb-20"
//         />
//         <div className="absolute inset-0 bg-black/50 flex justify-center items-center text-white text-4xl font-extrabold">
//           <h1>{isFirstTimePayment ? "Registration + Monthly Fee" : "Monthly Fee Payment"}</h1>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 mt-20">
//         {/* Payment Status Info */}
//         <div className={`mb-6 p-4 rounded-lg ${
//           isFirstTimePayment
//             ? 'bg-blue-100 border border-blue-300'
//             : 'bg-green-100 border border-green-300'
//         }`}>
//           <h2 className="text-lg font-semibold mb-2">
//             {isFirstTimePayment ? "🎯 First Time Payment" : "🔄 Monthly Fee Payment"}
//           </h2>
//           <p className="text-sm">
//             {isFirstTimePayment
//               ? "आपको Registration Fee (₹50) + Monthly Plan Fee देनी होगी।"
//               : "आपको केवल Monthly Plan Fee देनी होगी।"
//             }
//           </p>
//         </div>

//         {/* Payment Form */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formdata.userName}
//                   onChange={(e) => setFormdata({...formdata, userName: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={formdata.userEmail}
//                   onChange={(e) => setFormdata({...formdata, userEmail: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>


//             {/* Batch selection (always show) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Select Batch
//               </label>
//               <select
//                 value={formdata.course}
//                 onChange={(e) => {
//                   const selectedBatch = batchOptions.find(b => b.value === e.target.value);
//                   // Map batch to legacy plan name for backend compatibility
//                   let plan = '';
//                   if (selectedBatch) {
//                     if (selectedBatch.label === 'Morning Batch') plan = 'Basic';
//                     else if (selectedBatch.label === 'Mid Morning Batch') plan = 'Standard';
//                     else if (selectedBatch.label === 'Afternoon Batch' || selectedBatch.label === 'Full Day Batch') plan = 'Premium';
//                   }
//                   setFormdata(prev => ({
//                     ...prev,
//                     course: e.target.value,
//                     plan: plan,
//                     planAmount: selectedBatch ? selectedBatch.amount : 0
//                   }));
//                 }}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Batch</option>
//                 {batchOptions.map((batch) => (
//                   <option key={batch.value} value={batch.value}>
//                     {batch.label} (₹{batch.amount})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Plan selection (synced with batch, read-only) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Monthly Plan
//               </label>
//               <input
//                 type="text"
//                 value={formdata.plan ? `${formdata.plan} (₹${formdata.planAmount})` : ''}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
//                 placeholder="Select a batch to set plan"
//                 required
//               />
//             </div>

//             {/* Payment Summary */}
//             {formdata.plan && (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold mb-2">Payment Summary</h3>
//                 <div className="space-y-1 text-sm">
//                   {isFirstTimePayment && (
//                     <div className="flex justify-between">
//                       <span>Registration Fee:</span>
//                       <span>₹{formdata.registrationFee}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between">
//                     <span>{formdata.plan} Plan (Monthly):</span>
//                     <span>₹{formdata.planAmount}</span>
//                   </div>
//                   <div className="border-t pt-1 flex justify-between font-semibold">
//                     <span>Total Amount:</span>
//                     <span>₹{formdata.totalAmount}</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={!canPay || loading}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold"
//             >
//               {loading ? "Processing..." : `Pay ₹${formdata.totalAmount}`}
//             </button>
//           </form>

//           {message && (
//             <div className={`mt-4 p-3 rounded ${
//               message.includes('successful')
//                 ? 'bg-green-100 text-green-700'
//                 : 'bg-red-100 text-red-700'
//             }`}>
//               {message}
//             </div>
//           )}

//           {/* Warning message for plan expiry or payment status */}
//           {latestPayment && (
//             <div className={`mt-4 p-3 rounded ${
//               planExpired
//                 ? 'bg-red-100 text-red-700'
//                 : 'bg-yellow-100 text-yellow-700'
//             }`}>
//               {planExpired
//                 ? "⚠️ Your plan has expired. Please pay the fee to renew."
//                 : `ℹ️ You already paid the fee for this month. Next due: ${new Date(latestPayment.endDate).toLocaleDateString('en-IN')}`
//               }
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Image from "next/image";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Calendar,
  User,
  Mail,
  BookOpen,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function UnifiedPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    userName: "",
    userEmail: "",
    plan: "",
    course: "",
    planAmount: 0,
    registrationFee: 50,
    totalAmount: 0,
    paymentStatus: "pending",
    order_id: "",
    razorpay_payment_id: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [hasRegistrationFee, setHasRegistrationFee] = useState<boolean>(false);
  const [checkingRegistration, setCheckingRegistration] = useState<boolean>(false);
  const [isFirstTimePayment, setIsFirstTimePayment] = useState<boolean>(true);
  const [latestPayment, setLatestPayment] = useState<any>(null);
  const [canPay, setCanPay] = useState(true);
  const [planExpired, setPlanExpired] = useState(false);

  // Define batch options and their prices
  const batchOptions = [
    { 
      label: 'Morning Batch', 
      value: 'Morning Batch', 
      amount: 650,
      time: '7:00 AM - 10:00 AM',
      description: 'Perfect for early risers'
    },
    { 
      label: 'Mid Morning Batch', 
      value: 'Mid Morning Batch', 
      amount: 800,
      time: '10:00 AM - 1:00 PM',
      description: 'Ideal for flexible schedules'
    },
    { 
      label: 'Afternoon Batch', 
      value: 'Afternoon Batch', 
      amount: 1200,
      time: '2:00 PM - 5:00 PM',
      description: 'Post-lunch productive hours'
    },
    { 
      label: 'Full Day Batch', 
      value: 'Full Day Batch', 
      amount: 1500,
      time: '9:00 AM - 5:00 PM',
      description: 'Complete day access'
    },
  ];

  // Load user data from localStorage and query params
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    // Redirect to login if user is not logged in
    if (!userName) {
      router.replace('/login');
      return;
    }

    // Read batch from query params only (ignore plan param for backend compatibility)
    const batchParam = searchParams.get('batch');

    // Map batch to legacy plan name for backend compatibility
    let plan = '';
    if (batchParam) {
      if (batchParam === 'Morning Batch') plan = 'Basic';
      else if (batchParam === 'Mid Morning Batch') plan = 'Standard';
      else if (batchParam === 'Afternoon Batch' || batchParam === 'Full Day Batch') plan = 'Premium';
    }

    setFormdata(prev => ({
      ...prev,
      userName: userName || '',
      userEmail: userEmail || '',
      course: batchParam || prev.course,
      plan: plan || prev.plan
    }));

    if (userEmail) {
      checkRegistrationStatus(userEmail);
    }
  }, [searchParams, router]);

  // Check if user has paid registration fee
  const checkRegistrationStatus = async (userEmail: string) => {
    try {
      setCheckingRegistration(true);
      const res = await fetch(`/api/check-registration?userEmail=${userEmail}`);
      const data = await res.json();

      if (res.ok) {
        setHasRegistrationFee(data.hasRegistrationFee);
        setIsFirstTimePayment(!data.hasRegistrationFee);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    } finally {
      setCheckingRegistration(false);
    }
  };

  // Update total amount when batch or registration status changes
  useEffect(() => {
    if (formdata.course) {
      const batch = batchOptions.find(b => b.value === formdata.course);
      const planAmount = batch ? batch.amount : 0;
      const registrationFee = isFirstTimePayment ? 50 : 0;
      const totalAmount = planAmount + registrationFee;

      setFormdata(prev => ({
        ...prev,
        planAmount,
        registrationFee,
        totalAmount
      }));
    }
  }, [formdata.course, isFirstTimePayment]);

  // Fetch latest monthly payment for user
  useEffect(() => {
    const fetchLatestPayment = async () => {
      if (!formdata.userEmail) return;
      try {
        const res = await fetch(`/api/monthly-payment?userEmail=${formdata.userEmail}`);
        const data = await res.json();
        if (res.ok && Array.isArray(data.data) && data.data.length > 0) {
          const latest = data.data[0];
          setLatestPayment(latest);
          const now = new Date();
          const end = new Date(latest.endDate);
          if (latest.paymentStatus === 'Paid' && end >= now) {
            setCanPay(false);
            setPlanExpired(false);
            setMessage(`You already paid the fee for this month. Next due: ${end.toLocaleDateString('en-IN')}`);
          } else if (end < now) {
            setCanPay(true);
            setPlanExpired(true);
            setMessage('Your plan has expired. Please pay the fee to renew.');
          } else {
            setCanPay(true);
            setPlanExpired(false);
          }
        } else {
          setCanPay(true);
          setPlanExpired(true);
        }
      } catch (err) {
        setCanPay(true);
        setPlanExpired(false);
      }
    };
    fetchLatestPayment();
  }, [formdata.userEmail]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment process
  const handlePayment = async () => {
    try {
      // Create order for the total amount
      const res = await fetch("/api/monthly-fee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formdata.totalAmount,
          plan: formdata.plan,
          isFirstTimePayment: isFirstTimePayment,
          registrationFee: formdata.registrationFee,
          planAmount: formdata.planAmount
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.order_id) {
        setMessage("Order creation failed.");
        setLoading(false);
        return;
      }

      // Load Razorpay
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setMessage("Razorpay SDK failed to load. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_7VXRc8O89d3bz1",
        amount: data.amount,
        currency: data.currency,
        name: "BBLC Library",
        description: isFirstTimePayment
          ? `BBLC Registration Fee + ${formdata.plan} Monthly Plan`
          : `BBLC ${formdata.plan} Monthly Plan`,
        order_id: data.order_id,
        notes: {
          payment_type: isFirstTimePayment ? 'registration_and_monthly' : 'monthly_only',
          registration_fee: formdata.registrationFee,
          plan_fee: formdata.planAmount,
          total_amount: formdata.totalAmount,
          plan_name: formdata.plan,
          user_email: formdata.userEmail,
          user_name: formdata.userName,
          breakdown: isFirstTimePayment
            ? `1. Registration Fee: ₹${formdata.registrationFee} | 2. ${formdata.plan} Monthly Plan: ₹${formdata.planAmount} | Total: ₹${formdata.totalAmount}`
            : `${formdata.plan} Monthly Plan: ₹${formdata.totalAmount}`
        },
        handler: async function (response: any) {
          await handlePaymentSuccess(response, data.order_id);
        },
        prefill: {
          name: formdata.userName,
          email: formdata.userEmail,
          contact: "9999999999",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setMessage("Payment was cancelled. You can try again.");
            setLoading(false);
          },
        },
      };

      // Open Razorpay payment form
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      setMessage("Error initiating payment. Please try again.");
      setLoading(false);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (response: any, orderId: string) => {
    try {
      // If first time payment, save both registration and monthly fee
      if (isFirstTimePayment) {
        // Save registration fee
        await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: formdata.userName,
            userEmail: formdata.userEmail,
            course: formdata.course || "Library Access",
            registrationFee: formdata.registrationFee,
            paymentStatus: "Paid",
            order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
          }),
        });
      }

      // Save monthly fee
      const monthlyRes = await fetch("/api/monthly-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formdata.userName,
          userEmail: formdata.userEmail,
          plan: formdata.plan,
          batch: formdata.course,
          amount: formdata.planAmount,
          startDate: formdata.startDate,
          endDate: formdata.endDate,
          paymentStatus: "Paid",
          order_id: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
        }),
      });

      if (monthlyRes.ok) {
        // Send confirmation email
        await fetch("/api/monthly-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: formdata.userName,
            userEmail: formdata.userEmail,
            plan: formdata.plan,
            amount: formdata.totalAmount,
            startDate: formdata.startDate,
            endDate: formdata.endDate,
            paymentStatus: "Paid",
            order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            isFirstTimePayment,
            registrationFee: isFirstTimePayment ? formdata.registrationFee : 0
          }),
        });

        setMessage(
          isFirstTimePayment
            ? "✅ Registration and monthly fee payment successful! Confirmation email has been sent."
            : "✅ Monthly fee payment successful! Confirmation email has been sent."
        );

        // Update registration status
        setHasRegistrationFee(true);
        setIsFirstTimePayment(false);
        setCanPay(false);
      } else {
        setMessage("Payment processed but failed to save details. Please contact support.");
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
      setMessage("Payment successful but there was an error saving details. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate form
    if (!formdata.userName || !formdata.userEmail || !formdata.plan) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (isFirstTimePayment && !formdata.course) {
      setMessage("Please select a batch for registration.");
      setLoading(false);
      return;
    }

    await handlePayment();
  };

  if (checkingRegistration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <Loader2 className="inline-block animate-spin h-12 w-12 text-blue-600" />
          <p className="mt-4 text-gray-600 font-medium">Checking registration status...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-[60vh] overflow-hidden">
        <Image
          src="/heroimg/pexels-pixabay-159775.jpg"
          alt="Library Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {isFirstTimePayment ? "Complete Your Registration" : "Renew Your Membership"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              {isFirstTimePayment 
                ? "Join BBLC Library today and unlock unlimited access to knowledge"
                : "Continue your learning journey with uninterrupted access"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                  <p className="text-gray-600">Secure payment powered by Razorpay</p>
                </div>
              </div>

              {/* Payment Status Badge */}
              <div className={`mb-8 p-4 rounded-xl border ${
                isFirstTimePayment
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isFirstTimePayment ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                    {isFirstTimePayment ? 
                      <AlertCircle className="h-5 w-5 text-blue-600" /> : 
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    }
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {isFirstTimePayment ? "New Registration" : "Existing Member"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isFirstTimePayment
                        ? "Registration Fee (₹50) + Monthly Plan Fee required"
                        : "Only Monthly Plan Fee required"
                      }
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={formdata.userName}
                          onChange={(e) => setFormdata({...formdata, userName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={formdata.userEmail}
                          onChange={(e) => setFormdata({...formdata, userEmail: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Batch Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Select Your Batch
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batchOptions.map((batch) => (
                      <div
                        key={batch.value}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                          formdata.course === batch.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          let plan = '';
                          if (batch.label === 'Morning Batch') plan = 'Basic';
                          else if (batch.label === 'Mid Morning Batch') plan = 'Standard';
                          else if (batch.label === 'Afternoon Batch' || batch.label === 'Full Day Batch') plan = 'Premium';
                          
                          setFormdata(prev => ({
                            ...prev,
                            course: batch.value,
                            plan: plan,
                            planAmount: batch.amount
                          }));
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">{batch.label}</h4>
                          <span className="text-lg font-bold text-blue-600">₹{batch.amount}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{batch.time}</p>
                        <p className="text-xs text-gray-500">{batch.description}</p>
                        {formdata.course === batch.value && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-blue-500 text-white p-1 rounded-full">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                {formdata.plan && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Summary
                    </h3>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                      <div className="space-y-3">
                        {isFirstTimePayment && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                              <span className="text-gray-700">Registration Fee</span>
                              <p className="text-xs text-gray-500">One-time charge</p>
                            </div>
                            <span className="font-medium">₹{formdata.registrationFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <span className="text-gray-700">{formdata.plan} Monthly Plan</span>
                            <p className="text-xs text-gray-500">Valid for 30 days</p>
                          </div>
                          <span className="font-medium">₹{formdata.planAmount}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <div>
                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            <p className="text-sm text-gray-500">Inclusive of all charges</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">₹{formdata.totalAmount}</div>
                            <p className="text-sm text-gray-500">per month</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <button
                  type="submit"
                  disabled={!canPay || loading || !formdata.plan}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                    (!canPay || loading || !formdata.plan)
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      {!formdata.plan ? 'Select a Batch to Continue' : `Pay ₹${formdata.totalAmount}`}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Messages */}
              {message && (
                <div className={`mt-6 p-4 rounded-xl border ${
                  message.includes('✅') || message.includes('successful')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : message.includes('cancelled') || message.includes('expired')
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    {message.includes('✅') || message.includes('successful') ? (
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    ) : message.includes('cancelled') || message.includes('expired') ? (
                      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    )}
                    <p>{message}</p>
                  </div>
                </div>
              )}

              {/* Plan Status */}
              {latestPayment && (
                <div className={`mt-6 p-4 rounded-xl border ${
                  planExpired
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <Calendar className={`h-5 w-5 ${planExpired ? 'text-amber-600' : 'text-blue-600'}`} />
                    <div>
                      <p className="font-medium">
                        {planExpired
                          ? "⚠️ Your plan has expired. Please renew to continue access."
                          : `✅ Active until ${new Date(latestPayment.endDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                        }
                      </p>
                      {!planExpired && (
                        <p className="text-sm text-gray-600 mt-1">
                          Next payment due: {new Date(latestPayment.endDate).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Info & Features */}
          <div className="space-y-6">
            {/* Security Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-4">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  256-bit SSL encryption
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  PCI DSS compliant
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Razorpay secured gateway
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">What You Get</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span>24/7 Library Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span>Wi-Fi & Study Space</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span>Book Borrowing Rights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span>Access to Digital Resources</span>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  For payment issues or questions, contact our support team:
                </p>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">📞 +91 99999 99999</p>
                  <p className="text-gray-600">support@bblclibrary.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}