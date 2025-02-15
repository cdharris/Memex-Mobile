import React from 'react'
import {
    Text,
    View,
    Alert,
    SectionList,
    SectionListRenderItem,
} from 'react-native'

import { StatefulUIElement } from 'src/ui/types'
import ResultPage from '../../components/result-page-with-notes'
import Logic, { State, Event } from './logic'
import styles from './styles'
import { PageWithNotes } from 'src/features/overview/types'
import { EditorMode } from 'src/features/page-editor/types'
import * as selectors from './selectors'
import { NotesSection } from './types'

interface Props {}

export default class NotesView extends StatefulUIElement<Props, State, Event> {
    constructor(props: Props) {
        super(props, { logic: new Logic() })
    }

    private navToPageEditor = (mode: EditorMode, page: PageWithNotes) => () =>
        this.props.navigation.navigate('PageEditor', { page, mode })

    private initHandleDeletePagePress = args => () =>
        Alert.alert(
            'Delete confirm',
            'Do you really want to delete this page?',
            [
                { text: 'Cancel' },
                {
                    text: 'Delete',
                    onPress: () => this.processEvent('deletePage', args),
                },
            ],
        )

    private initHandleDeleteNotePress = args => () =>
        Alert.alert(
            'Delete confirm',
            'Do you really want to delete this note?',
            [
                { text: 'Cancel' },
                {
                    text: 'Delete',
                    onPress: () => this.processEvent('deleteNote', args),
                },
            ],
        )

    private initHandleToggleNoteStar = args => () =>
        this.processEvent('toggleNoteStar', args)

    private renderPage: SectionListRenderItem<PageWithNotes> = ({
        item,
        index,
        section,
    }) => (
        <ResultPage
            initNoteEdit={() => () => console.log(item)}
            initNoteDelete={note =>
                this.initHandleDeleteNotePress({
                    section: section.title,
                    pageUrl: item.url,
                    noteUrl: note.url,
                })
            }
            initNoteStar={note =>
                this.initHandleToggleNoteStar({
                    section: section.title,
                    pageUrl: item.url,
                    noteUrl: note.url,
                })
            }
            onStarPress={() =>
                this.processEvent('togglePageStar', {
                    section: section.title,
                    pageUrl: item.url,
                })
            }
            onCommentPress={this.navToPageEditor('notes', item)}
            onDeletePress={this.initHandleDeletePagePress({
                section: section.title,
                pageUrl: item.url,
            })}
            onTagPress={this.navToPageEditor('tags', item)}
            onDropdownPress={() =>
                this.processEvent('toggleShowNotes', {
                    section: section.title,
                    pageUrl: item.url,
                })
            }
            key={index}
            {...item}
        />
    )

    private renderSection: SectionListRenderItem<NotesSection> = ({
        section: { title },
    }) => <Text style={styles.sectionText}>{title}</Text>

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={this.renderPage}
                    renderSectionHeader={this.renderSection}
                    sections={selectors.results(this.state)}
                    style={styles.pageList}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
