// const stripe = require("stripe")(process.env.STRIPE_KEY);

// ('use strict');

// /**
//  * category controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// //createCoreController is used to handle CRUD operations
// module.exports = createCoreController("api::order.order", ({strapi}) => ({
//     async create (ctx){
//         const {products} = ctx.request.body;
//         try{
//         const lineItems = await Promise.all(products.map(async (product) => 
//         { // this function takes the product from ...
//             //the frontend and searches the products db for the specified product.
//             const item = await strapi
//                 .service("api::product.product")
//                 .findOne(product.id)
//             return{
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: item.title, //////////////////////////////////
//                     },
//                     unit_amount: item.price*100 //////////////////////////////////
//                 }
//             }

//         })  
//         );
//         // try{
//             const session = await stripe.checkout.sessions.create({ //////////////////////////////////`
//                 //line_items sends our data to the checkout page, there we weill need the product information.
//                 shipping_address_collection:  {allowed_countries:["IN"]},
//                 payment_method_types: ["card"],
//                 mode: 'payment',
//                 success_url: `${process.env.CLIENT_URL}/success=true`,
//                 cancel_url: `${process.env.CLIENT_URL}/ canceled=true`,
//                 line_items: lineItems,
//             });
//             await strapi.service("api::order.order").create({
//                 data: {
//                     products,
//                     stripeId: session.id,
//                 },
//             });
//             return {stripeSession: session};
//         }
//         catch(error){
//             ctx.response.status = 500;
//             return {error};
//         }
//     }
// }));


("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['IN', 'CA']},
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: process.env.CLIENT_URL+"?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: {  products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
