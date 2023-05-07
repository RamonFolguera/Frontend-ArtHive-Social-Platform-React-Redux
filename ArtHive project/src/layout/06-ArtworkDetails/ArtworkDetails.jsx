import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { artworkData } from '../artworkSlice'
import { useSelector } from 'react-redux'
import { NavBar } from '../../components/NavBar/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import './ArtworkDetails.css'
import { FooterTemplate } from '../../components/FooterTemplate/FooterTemplate'
import {
  addComment,
  addRating,
  bringAllUserArtworks,
  deleteComment,
  deleteRating,
  updateComment,
  updateRating,
} from '../../services/apiCalls'
import { userData } from '../userSlice'
import { InputText } from '../../components/InputText/InputText'
import { validate } from '../../helpers/useful'
import { ModalTemplate } from '../../components/ModalTemplate/ModalTemplate'

export const ArtworkDetails = () => {
  const navigate = useNavigate()
  const userCredentialsRdx = useSelector(userData)
  const artworkSelectedRdx = useSelector(artworkData)
  const artworkSelectedObj = artworkSelectedRdx.choosenArtwork
  const [myUserArtwork, setMyUserArtwork] = useState([])
  const [allUserArtworks, setAllUserArtworks] = useState([])
  const [allUserArtworksSelected, setAllUserArtworksSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentRating, setCommentRating] = useState({
    artwork_id: artworkSelectedObj.id,
    comment: '',
    rating: null,
  })
  const [averageRating, setAverageRating] = useState(null)
  const [commentRatingAct, setCommentRatingAct] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  let hasVoted = false;
  let totalRating = 0

  const ratingSum = (res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].rating !== null) {
        totalRating += res[i].rating
      }
    }
    return totalRating
  }

  const inputHandler = (e) => {
    setCommentRating((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (allUserArtworks.length === 0) {
      setTimeout(() => {
        bringAllUserArtworks(userCredentialsRdx.credentials.token)
          .then((result) => {
            setLoading(false)
            if (result.data.data.length === 0) {
              return
            }
            setAllUserArtworks(result.data.data)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [])


useEffect(() => {
  if (allUserArtworks.length > 0) {
    /////////////// Getting all user_artworks registered for this selected artwork
    const selectedUserArtworks = allUserArtworks.filter((userArtwork) => {
      return (
        artworkSelectedObj.id === userArtwork.artwork_id 
      )
    })
    setAllUserArtworksSelected(selectedUserArtworks)
  }
  },[allUserArtworks])

  useEffect(() => {
    if (allUserArtworksSelected.length > 0) {
    /////////////// Getting my user_artwork registered for this selected artwork
    const myUserArtworkSelected = allUserArtworksSelected.find((userArtwork) => {
      return (
        userArtwork.user_id === userCredentialsRdx.credentials.user.userId
      )
    })

    if (!myUserArtworkSelected) {
      setMyUserArtwork([])
    } else {
      setMyUserArtwork(myUserArtworkSelected)
    }
  }
},[allUserArtworksSelected])
  
  useEffect(() => {
          /////////////// Saving average rating
    const ratingsNotNull = allUserArtworksSelected.filter((userArtwork) => {
      return (
              userArtwork.rating !== null
      )
    })
    if (ratingsNotNull.length > 0) {
    let newTotalRating = ratingSum(ratingsNotNull)

    let avgRating = Math.floor(newTotalRating / ratingsNotNull.length)
    setAverageRating(avgRating)
  } else {
    setAverageRating(null)
  }
  }, [allUserArtworksSelected])

  const [valiCommentRating, setValiCommentRating] = useState({
    commentVali: false,
    ratingVali: false,
  })

  const [commentRatingError, setCommentRatingError] = useState({
    commentError: false,
    ratingError: false,
  })

  useEffect(() => {
    for (let error in commentRatingError) {
      if (commentRatingError[error] != '') {
        setCommentRatingAct(false)
        return
      }
    }

    for (let empty in commentRating) {
      if (commentRating[empty] === '') {
        setCommentRatingAct(false)
        return
      }
    }

    for (let validated in valiCommentRating) {
      if (valiCommentRating[validated] === false) {
        setCommentRatingAct(false)
        return
      }
    }
    setCommentRatingAct(true)
  })

  const checkError = (e) => {
    let error = ''
    let checked = validate(e.target.name, e.target.value, e.target.required)
    error = checked.message

    setValiCommentRating((prevState) => ({
      ...prevState,
      [e.target.name + 'Vali']: checked.validated,
    }))

    setCommentRatingError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }))
  }

  const createOrUpdateComment = (myUserArtwork) => {

    const comment = commentRating.comment

    if (myUserArtwork.length === 0) {

      addComment({ comment: comment, artwork_id:artworkSelectedObj.id }, userCredentialsRdx.credentials.token)
      .then((response) => {
        console.log(response);
        const newComment = response.data.data; // Get the newly added comment from the response
        setAllUserArtworks((prevState) => [
          ...prevState,
          {
            rating: null,
            artwork_id: newComment.artwork_id,
            favorite: false,
            comment: newComment.comment,
            id: newComment.id,
            user_id: userCredentialsRdx.credentials.user.userId
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log(myUserArtwork,"entro a update");
      updateComment(
        myUserArtwork.id,
        { comment: comment },
        userCredentialsRdx.credentials.token
      )
      
      .then(() => {
        const modifiedIndex = allUserArtworks.findIndex(userArtwork => userArtwork.id === myUserArtwork.id);
        setAllUserArtworks(prevState => {
          const newState = [...prevState];
          newState[modifiedIndex] = { ...newState[modifiedIndex], comment };
          return newState;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const deleteYourComment = (userArtworkSelectedObj) => {
    deleteComment(
      userArtworkSelectedObj.id,
      userCredentialsRdx.credentials.token
    ).then(() => {
      setAllUserArtworks((prevState) =>
        prevState.map((userArtworkSelected) =>
          userArtworkSelected.user_id ===
          userCredentialsRdx.credentials.user.userId
            ? {
                ...userArtworkSelected,
                comment: null,
              }
            : userArtworkSelected
        )
      )
     
    })
  }

  const deleteYourRating = (myUserArtwork) => {
    deleteRating(
      myUserArtwork.id,
      userCredentialsRdx.credentials.token
    ).then(() => {
      setAllUserArtworks((prevState) =>
      prevState.map((userArtwork) =>
      userArtwork.user_id ===
        userCredentialsRdx.credentials.user.userId
          ? {
              ...userArtwork,
              rating: null,
            }
          : userArtwork
      )
    )
    hasVoted = false;
    handleCloseModal();
    })
  }
console.log(allUserArtworks);
  const createOrUpdateRating = (myUserArtwork) => {
    const rating = parseInt(commentRating.rating);

       if (myUserArtwork.length === 0) {
      addRating({rating: rating, artwork_id:artworkSelectedObj.id },userCredentialsRdx.credentials.token)
      .then((response) => {
        console.log(response);
        const newRating = response.data.data; // Get the newly added comment from the response
        setAllUserArtworks((prevState) => [
          ...prevState,
          {
            rating: newRating.rating,
            artwork_id: newRating.artwork_id,
            favorite: false,
            comment: null,
            id: newRating.id,
            user_id: userCredentialsRdx.credentials.user.userId
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {

      updateRating(
        myUserArtwork.id,
        { rating: rating },
        userCredentialsRdx.credentials.token
      ).then(() => {
  
        setAllUserArtworks((prevState) =>
          prevState.map((userArtwork) =>
          userArtwork.user_id ===
            userCredentialsRdx.credentials.user.userId
              ? {
                  ...userArtwork,
                  rating: rating,
                }
              : userArtwork
          )
        )
      })
      
    }
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <SpinnerComponent message="Art is coming... hold on!" />
        </div>
      </>
    )
  } else if (allUserArtworks.length > 0) {
    return (
      <>
        <NavBar />

        <Container fluid className="mainContainer d-flex flex-column align-items-center">
          <h2 className="galleryTitleDesign text-center">Artwork in detail</h2>
          <Row className="d-flex justify-content-center sectionRow">
            <Col xs={12} lg={4} className="me-lg-5 mb-4">
              <div className="cardsContainer d-flex ">
                <div className="artworkCardDetailsDesign d-flex flex-column justify-content-between">
                  <p className="pe-4 titleFieldDesign">
                    {artworkSelectedObj.title}
                  </p>
                  <p>{artworkSelectedObj.description}</p>
                  <p>{artworkSelectedObj.Artist.artistic_name}</p>
                  <p>{artworkSelectedObj.category}</p>
                  <p>{artworkSelectedObj.technique}</p>
                  <p>{artworkSelectedObj.dimensions}</p>
                  <p>{artworkSelectedObj.price}</p>
                  <div type="button" className="goToArtPageBtn text-center d-flex align-items-center">
                    <p className="m-0">GO TO THE ARTIST PERSONAL PAGE TO GET TO KNOW THEM</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={4} className="ms-lg-5">
              <div>
                <img
                  className="ImgDesign"
                  src={`http://localhost:3000/static/${artworkSelectedObj.image_url}`}
                />
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center commentsRatingContainer">
          
            <Col xs={12} lg={8} className="mb-4">
          

                {allUserArtworks.map((userArtwork) => {
                  return (
                    <div
                      key={userArtwork.id}
                      className="d-flex justify-content-between align-items-end flex-column flex-lg-row"
                    >
                      <div
                        className={
                          (userArtwork.id === myUserArtwork.id &&  myUserArtwork.user_id === userCredentialsRdx.credentials.user.userId && userArtwork.comment !== null)
                          ? 'commentLine userComment m-0 mt-3 me-0 me-lg-3 w-100' :
                          (userArtwork.artwork_id === artworkSelectedObj.id && userArtwork.comment !== null )  
                          ? 'commentLine m-0 mt-3 w-100'
                          : 'm-0 w-100'
                        }
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="m-0">{
                          (userArtwork.artwork_id === artworkSelectedObj.id && userArtwork.comment !== null) 
                          ? <div>
                            {}{userArtwork.comment} </div>
                          : <div></div>
                          }</div>
                        </div>
                      </div>
                      <div>
                      {(userArtwork.id === myUserArtwork.id && myUserArtwork.user_id === userCredentialsRdx.credentials.user.userId  && userArtwork.comment !== null) ? (
                        <button
                          onClick={() =>
                            deleteYourComment(myUserArtwork)
                          }
                          className="buttonSubmitCommentDesign mt-3"
                        >
                          Delete
                        </button>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    </div>
                  )
                })}
                <div className="d-flex justify-content-center align-items-center">
                  <InputText
                    className={
                      commentRatingError.nameError === ''
                        ? 'inputDesign commentInput me-3'
                        : 'inputDesign commentInput me-3'
                    }
                    type={'text'}
                    name={'comment'}
                    placeholder="Add new comment or update your comment"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                 <div className="errorMessage"> {commentRatingError.nameError}</div>
                  <button
                    className="ps-3 pe-3 mt-3 mb-3 buttonSubmitCommentDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      createOrUpdateComment(myUserArtwork)
                    }}
               
                  >
                    Submit{' '}
                  </button>
                </div>
              
            </Col>
            <Col xs={12} lg={4}>
            {showModal && (
                <div className="modalContainer">
                  <ModalTemplate
                    key="loginModal"
                    className="loginModalDesign"
                    title="Please, confirm"
                    body="Are you sure you want to delete your rating?"
                    button1="Close"
                    button2="Yes, delete it"
                    clickFunction1={() => handleCloseModal()}
                    clickFunction2={() => deleteYourRating(myUserArtwork)}
                  />
                </div>
              )}

              <div className="ratingContainer d-flex justify-content-center flex-column align-items-center">
                <div>
                  {averageRating === null ?  <p className="ratingStyle">0</p> :   <p className="ratingStyle">{averageRating}</p>}
                </div>

                <div className="d-flex justify-content-center flex-column align-items-center">
                {allUserArtworks.map((userArtworkSelected) => {
      if (!hasVoted && userArtworkSelected.id === myUserArtwork.id && userArtworkSelected.rating !== null) {
        // Si el usuario ha votado en una obra de arte, mostrar su rating
        hasVoted = true;
        return <div key={userArtworkSelected.id}>Your rating is: {userArtworkSelected.rating}</div>;
      } else if (!hasVoted && myUserArtwork.id && userArtworkSelected.id === myUserArtwork.id && userArtworkSelected.rating === null) {
        // Si el usuario aún no ha votado en una obra de arte, mostrar "You haven't voted yet"
        hasVoted = true;
        return <div key={userArtworkSelected.id}>You haven't voted yet</div>;
      } else {
        // Si la obra de arte no es la seleccionada por el usuario, mostrar un espacio en blanco
        return <div key={userArtworkSelected.id}></div>;
      }
    })}
                  <InputText
                    className={
                      commentRatingError.nameError === ''
                        ? 'inputDesign ratingInput'
                        : 'inputDesign  ratingInput'
                    }
                    type={'text'}
                    name={'rating'}
                    placeholder="Add rating (1-100)"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{commentRatingError.nameError}</div>
                 <div className="d-flex justify-content-between">
                  <button
                    className="ps-3 pe-3 mt-3 mb-3 me-2 buttonSubmitRatingDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      createOrUpdateRating(myUserArtwork)
                    }}
                 
                  >
                    Submit{' '}
                  </button>
                  <button
                    className="ps-3 pe-3 mt-3 mb-3  ms-2 buttonSubmitRatingDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      handleShowModal()
                    }}
                 
                  >
                    Delete{' '}
                  </button>
                  </div>
                </div>
              </div>
            </Col>
           
          </Row>
        </Container>
        <FooterTemplate/>
      </>
    )
  }
}
