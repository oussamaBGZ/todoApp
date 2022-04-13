import List from '../interfaces/list'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

function ListComponent({ handelDelete, todos }: List) {
    return (
        <ul className="todos" id="todos">
            <TransitionGroup>
                {
                    todos.map(el => el.show &&
                        <CSSTransition
                            key={el.id}
                            timeout={300}
                            classNames="item"
                        >
                            <li>
                                {el.todo}
                                <button onClick={() => handelDelete(el.id)} className="btn"><img alt="delete icon" style={{ width: 30 }} src={require("../imgs/delete.png")} /></button>
                            </li>
                        </CSSTransition>

                    )
                }
            </TransitionGroup>
        </ul>
    )
}

export default ListComponent