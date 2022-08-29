;<div className={styles.main}>
  <div className={styles.top}>
    <div className={styles.left}></div>
    <div className={`${styles.center} ${styles.flexunder}`}></div>
    <div className={styles.right}></div>
  </div>
  <div className={styles.bottom}>
    <div className={styles.left}></div>
    <div className={styles.center}></div>
    <div className={styles.right}></div>
  </div>
</div>

// <div
//       className={styles.border}
//       style={{ width: '100%', maxWidth: '1024px', background: 'skyblue' }}
//     >
//       <div
//         className={`${styles.border} ${styles.login_layout} ${styles.login_layout_top}`}
//       >
//         <div className={styles.border}></div>
//         <div
//           className={`${styles.border} ${styles.login_layout_center}`}
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'flex-end',
//           }}
//         >
//           <img className={`${styles.login_logo}`} src="img/login_icon.png" />
//         </div>
//         <div className={styles.border}></div>
//       </div>
//       <div
//         className={`${styles.border} ${styles.login_layout} ${styles.login_layout_bottom}`}
//       >
//         <div className={styles.border}></div>
//         <div className={`${styles.border} ${styles.login_layout_center}`}>
//           <div style={{ height: '44%' }}>
//             <form
//               onSubmit={handleSubmit}
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 height: '100%',
//                 minHeight: '258px',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '65%',
//                   justifyContent: 'center',
//                   width: '100%',
//                 }}
//               >
//                 <div
//                   style={{
//                     width: '100%',
//                     height: '63%',
//                     minHeight: '105px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <input
//                     className={styles.login_input}
//                     type="text"
//                     name="id"
//                     placeholder="ID"
//                     value={state.values.id}
//                     onChange={(e) => {
//                       dispatch(changeId(e.target.value))
//                     }}
//                   />
//                   <input
//                     className={styles.login_input}
//                     type="password"
//                     name="pw"
//                     placeholder="Password"
//                     value={state.values.pw}
//                     onChange={(e) => {
//                       dispatch(changePw(e.target.value))
//                     }}
//                   />
//                 </div>
//               </div>
//               <div
//                 style={{
//                   width: '100%',
//                   height: '35%',
//                   minHeight: '91px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <button className={styles.login_btn} type="submit">
//                   Login
//                 </button>
//                 <div
//                   style={{
//                     borderTop: '1px solid black',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     paddingTop: '10px',
//                     fontFamily: 'Abel',
//                     fontStyle: 'normal',
//                     fontWeight: '400',
//                     fontSize: '13px',
//                   }}
//                 >
//                   <div
//                     style={{ paddingRight: '5px' }}
//                     type="button"
//                     onClick={() => {
//                       navigate('/register')
//                     }}
//                   >
//                     아이디찾기
//                   </div>
//                   <div
//                     style={{
//                       borderLeft: '1px solid black',
//                       borderRight: '1px solid black',
//                       padding: '0px 5px',
//                     }}
//                     type="button"
//                     onClick={() => {
//                       navigate('/register')
//                     }}
//                   >
//                     비밀번호찾기
//                   </div>
//                   <div
//                     style={{ paddingLeft: '5px' }}
//                     type="button"
//                     onClick={() => {
//                       navigate('/register')
//                     }}
//                   >
//                     회원가입
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div></div>
//         </div>
//         <div className={styles.border}></div>
//       </div>
//     </div>
